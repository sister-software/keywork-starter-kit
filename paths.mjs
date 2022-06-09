import { fileURLToPath } from 'url'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url)

/**
 * The absolute path to the project root.
 */
export const projectRoot = path.dirname(__filename)

/**
 * A path builder to the absolute project root.
 */
export const projectPath = path.join.bind(null, projectRoot)
