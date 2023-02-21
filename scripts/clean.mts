import type { BuildResult } from 'esbuild'
import { constants } from 'node:fs'
import * as fs from 'node:fs/promises'

/**
 * This function removes all unused CSS files from the build output
 * and serves as a bit of a hack to work around the fact that esbuild
 * generates a CSS file even if the file is empty.
 */
export function removeUnusedOutput(result: BuildResult) {
  if (!result.metafile) return

  const cssFiles = Object.keys(result.metafile.outputs).filter((outfile) => outfile.endsWith('.css'))
  return Promise.all(
    cssFiles.map((cssFilePath) => {
      return fs.rm(cssFilePath)
    })
  )
}

/**
 * Removes a directory and all of its contents.
 */
export async function cleanDir(filePath: string) {
  const present = await fs
    .access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false)

  if (!present) return

  console.log('Cleaning...', filePath)
  return fs.rm(filePath, { recursive: true })
}
