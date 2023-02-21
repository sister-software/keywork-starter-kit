/** @type {import('eslint').ESLint.Options}*/
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'code-import-patterns'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', '.tsx'],
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    browser: true,
    node: true,
    worker: true,
  },
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'react/prop-types': 'off',
    'no-undef': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['warn'],
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],

    'code-import-patterns/patterns': [
      'error',
      {
        zones: [
          {
            target: /packages\/browser\/.+/,
            forbiddenPatterns: [
              {
                pattern: /@local\/worker/,
                errorMessage:
                  'Worker modules cannot be imported in this browser bundled file. Instead, move your shared code to packages/shared and import via @local/shared',
              },
            ],
          },
          {
            target: /packages\/worker\/.+/,
            forbiddenPatterns: [
              {
                pattern: /@local\/browser/,
                errorMessage:
                  'Browser modules cannot be imported in this worker bundled file. Instead, move your shared code to packages/shared and import via @local/shared',
              },
            ],
          },

          {
            target: /packages\/shared\/.+/,
            forbiddenPatterns: [
              {
                pattern: /@local\/worker/,
                errorMessage:
                  'Worker specific code cannot be imported in the shared package. Instead, move your shared code to packages/shared and import via @local/shared',
              },
              {
                pattern: /@local\/browser/,
                errorMessage:
                  'Browser specific code cannot be imported in the shared package. Instead, move your shared code to packages/shared and import via @local/shared',
              },
            ],
          },
        ],
      },
    ],
  },
}

module.exports = config
