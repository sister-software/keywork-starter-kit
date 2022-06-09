import esbuild from 'esbuild'
import svgrPlugin from 'esbuild-plugin-svgr'
import FastGlob from 'fast-glob'
import { projectPath } from '../paths.mjs'

const watch = process.argv.some((arg) => arg === '--watch')

/** @type {import(esbuild.BuildOptions)} */
const commonEsbuildConfig = {
  bundle: true,
  platform: 'browser',
  plugins: [svgrPlugin()],
  watch,
}

async function buildBrowser() {
  console.log('[Browser]', 'Building...')

  await esbuild.build({
    ...commonEsbuildConfig,
    entryPoints: [projectPath('packages', 'browser', 'src/index.tsx')],
    outdir: projectPath('dist'),
  })

  console.log('[Browser]', 'Built!')
}

async function buildWorker() {
  console.log('[Worker]', 'Building...')
  const entryPoints = await FastGlob(projectPath('packages', 'worker', 'functions', '**', '*.{ts,tsx,mts}'))

  await esbuild.build({
    ...commonEsbuildConfig,
    // external: ['*.css'],
    format: 'esm',
    entryPoints: entryPoints,
    outdir: projectPath('functions'),
  })

  console.log('[Worker]', 'Built!')
}

await Promise.all([buildBrowser(), buildWorker()])
