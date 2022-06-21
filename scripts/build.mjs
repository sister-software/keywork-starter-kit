import esbuild from 'esbuild'
import svgrPlugin from 'esbuild-plugin-svgr'
import { BundledFileName, createBrowserBuildOptions, createWorkerBuildOptions } from 'keywork/bundling'
import { createRequire } from 'module'
import { projectPath } from '../paths.mjs'
import { cleanDir, removeUnusedOutput } from './clean.mjs'

const require = createRequire(import.meta.url)

const watch = process.argv.some((arg) => arg === '--watch')
const isProduction = process.env.NODE_ENV === 'production'

/** @type {esbuild.BuildOptions} */
const commonEsbuildConfig = {
  minify: isProduction,
  plugins: [svgrPlugin()],
  watch,
}

async function buildBrowser() {
  console.log('[Browser]', 'Building...')
  const outdir = projectPath('dist')
  await cleanDir(outdir)

  await esbuild.build({
    ...createBrowserBuildOptions([projectPath('packages', 'browser', 'src', 'main.tsx')], outdir),
    ...commonEsbuildConfig,
  })

  console.log('[Browser]', 'Built!')
}

async function buildWorker() {
  console.log('[Worker]', 'Building...')

  const result = await esbuild.build({
    ...createWorkerBuildOptions(
      [projectPath('packages', 'worker', 'src', 'main.tsx')],
      projectPath('dist', BundledFileName)
    ),
    ...commonEsbuildConfig,
    metafile: true,
    keepNames: true,
    inject: [require.resolve('keywork/polyfills/ReadableStream')],
    watch: watch
      ? {
          onRebuild: (build, result) => {
            if (build?.errors.length) return

            removeUnusedOutput(result)
          },
        }
      : false,
  })

  removeUnusedOutput(result)

  console.log('[Worker]', 'Built!')
}

await Promise.all([buildBrowser(), buildWorker()])
