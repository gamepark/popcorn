import globals from 'globals'
import pluginJs from '@eslint/js'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jestPlugin from 'eslint-plugin-jest'

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config([
    globalIgnores(['dist/**/*.{js,ts}', '*.config.{ts,mjs}']),
    { files: ['src/**/*.{js,mjs,cjs,ts}'] },
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        ignores: ['**/*.spec.{js,ts}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: globals.browser
        },
        ...pluginJs.configs.recommended,
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off'
        }
    },
    {
        files: ['**/*.spec.{js,ts}'],
        ...jestPlugin.configs['flat/recommended'],
        plugins: {
            jest: jestPlugin
        },
        settings: {
            jest: {
                version: 27
            }
        },
        languageOptions: {
            globals: jestPlugin.environments.globals.globals
        }
    },
    eslintPluginPrettierRecommended
])
