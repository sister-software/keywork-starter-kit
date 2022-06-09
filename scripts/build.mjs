import esbuild from 'esbuild'
import svgrPlugin from 'esbuild-plugin-svgr'
import FastGlob from 'fast-glob'
import { constants } from 'node:fs'
import * as fs from 'node:fs/promises'
import { projectPath } from '../paths.mjs'

const watch = process.argv.some((arg) => arg === '--watch')

async function cleanDir(filePath) {
  const present = await fs
    .access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (!present) return

  console.log('Cleaning...', filePath)
  return fs.rm(filePath, { recursive: true })
}

/** @type {import(esbuild.BuildOptions)} */
const commonEsbuildConfig = {
  bundle: true,
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
    entryPoints: entryPoints,
    metafile: true,
    outdir,
  })

  const cssFiles = Object.keys(result.metafile.outputs).filter((outfile) => outfile.endsWith('.css'))
  await Promise.all(
    cssFiles.map((cssFilePath) => {
      return fs.rm(cssFilePath)
    })
  )

  console.log('[Worker]', 'Built!')
}

await Promise.all([buildBrowser(), buildWorker()])
