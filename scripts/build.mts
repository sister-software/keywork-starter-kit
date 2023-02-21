import esbuild from 'esbuild'
import svgrPlugin from 'esbuild-plugin-svgr'
import { BundledFileName, createBrowserBuildOptions, createWorkerBuildOptions } from 'keywork/bundling/esbuild'
import { createRequire } from 'node:module'
import { projectPath } from '../paths.mjs'
import { cleanDir, removeUnusedOutput } from './clean.mjs'

const require = createRequire(import.meta.url)

const watching = process.argv.some((arg) => arg === '--watch')
const isProduction = process.env.NODE_ENV === 'production'

/** @type {esbuild.BuildOptions} */
const commonEsbuildConfig = {
  minify: isProduction,
  plugins: [svgrPlugin()],
}

async function buildBrowser() {
  console.log('[Browser]', 'Building...')
  const outdir = projectPath('dist', 'static')
  await cleanDir(outdir)

  return esbuild.context({
    ...createBrowserBuildOptions([projectPath('browser', 'main.tsx')], outdir),
    target: 'es2020',
    ...commonEsbuildConfig,
  })
}

async function buildWorker() {
  console.log('[Worker]', 'Building...')

  return esbuild.context({
    ...createWorkerBuildOptions([projectPath('worker', '_worker.ts')], projectPath('dist', BundledFileName)),
    ...commonEsbuildConfig,
    metafile: true,
    inject: [require.resolve('keywork/polyfills/worker/ReadableStream')],
  })
}

const [browserContext, workerContext] = await Promise.all([buildBrowser(), buildWorker()])

if (watching) {
  await Promise.all([browserContext.watch(), workerContext.watch()])
} else {
  const [, workerResult] = await Promise.all([browserContext.rebuild(), workerContext.rebuild()])
  removeUnusedOutput(workerResult)
  console.log('Built!')

  await Promise.all([browserContext.dispose(), workerContext.dispose()])
}
