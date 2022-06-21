import { constants } from 'node:fs'
import * as fs from 'node:fs/promises'

/**
 * @param {import('esbuild').BuildResult} result
 */
export function removeUnusedOutput(result) {
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
export async function cleanDir(filePath) {
  const present = await fs
    .access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (!present) return

  console.log('Cleaning...', filePath)
  return fs.rm(filePath, { recursive: true })
}
