import esbuild from 'esbuild'
import svgrPlugin from 'esbuild-plugin-svgr'
import FastGlob from 'fast-glob'
import { createRequire } from 'module'
import { constants } from 'node:fs'
import * as fs from 'node:fs/promises'
import { projectPath } from '../paths.mjs'

const require = createRequire(import.meta.url)

/** @type {esbuild.WatchMode} */
let watch = process.argv.some((arg) => arg === '--watch')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * @param {esbuild.BuildResult} result
 */
function removeUnusedOutput(result) {
  const cssFiles = Object.keys(result.metafile.outputs).filter((outfile) => outfile.endsWith('.css'))
  return Promise.all(
    cssFiles.map((cssFilePath) => {
      return fs.rm(cssFilePath)
    })
  )
}

/**
 * @param {string} filePath
 */
async function cleanDir(filePath) {
  const present = await fs
    .access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (!present) return

  console.log('Cleaning...', filePath)
  return fs.rm(filePath, { recursive: true })
}

/** @type {esbuild.BuildOptions} */
const commonEsbuildConfig = {
  bundle: true,
  minify: isProduction,
  platform: 'browser',
  plugins: [svgrPlugin()],
  watch,
}

async function buildBrowser() {
  console.log('[Browser]', 'Building...')
  const outdir = projectPath('dist')
  await cleanDir(outdir)

  await esbuild.build({
    ...commonEsbuildConfig,
    entryPoints: [projectPath('packages', 'browser', 'src/index.tsx')],
    outdir,
  })

  console.log('[Browser]', 'Built!')
}

async function buildWorker() {
  console.log('[Worker]', 'Building...')
  const entryPoints = await FastGlob(projectPath('packages', 'worker', 'functions', '**', '*.{ts,tsx,mts}'))
  const outdir = projectPath('functions')

  await cleanDir(outdir)

  const result = await esbuild.build({
    ...commonEsbuildConfig,
    format: 'esm',
    entryPoints,
    metafile: true,
    outdir,
    keepNames: true,
    inject: [require.resolve('keywork/polyfills/ReadableStream')],
    watch: watch
      ? {
          onRebuild: (build, result) => {
            if (build.errors.length) return

            removeUnusedOutput(result)
          },
        }
      : false,
  })

  removeUnusedOutput(result)

  console.log('[Worker]', 'Built!')
}

await Promise.all([buildBrowser(), buildWorker()])
