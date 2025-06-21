import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'

export default tsEslint.config(
  js.configs.recommended,
  tsEslint.configs.recommended,
  { ignores: ['build'] },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
      'prettier/prettier': ['warn'],
      'no-unused-vars': 'warn',
      'radix': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/no-unstable-nested-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
)

