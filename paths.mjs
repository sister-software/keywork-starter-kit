import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

/**
 * The absolute path to the project root.
 */
export const projectRoot = path.dirname(__filename)

/**
 * A path builder to the absolute project root.
 * @type {(...paths: string[]) => string}
 */
export const projectPath = path.join.bind(null, projectRoot)
