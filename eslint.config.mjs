import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsEslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        files: ['src/**/*.js', 'src/**/*.mjs', 'src/**/*.tsx', 'src/**/*.ts'],
        rules: {
            'max-depth': ['error', 5],
            'max-nested-callbacks': ['error', 5],
            'max-params': ['error', 3],
            'max-lines': ['error', 1000], // per file
            'max-lines-per-function': ['error', 200], // per function
            'max-statements': ['error', 50], // per function
        },
    },
    {
        ignores: ['**/*.test.js', '*.d.ts', 'dist/**/*.ts'],
    },
    eslintPluginPrettierRecommended,
];
