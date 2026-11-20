// ESLint flat config: JS + TypeScript recommended rules, React hooks rules, and Vite fast-refresh checks.
// Formatting is left to Prettier (eslint-config-prettier switches off conflicting rules).
import fs from 'node:fs';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Import boundaries (bulletproof-react): shared code -> features -> app, never the other way round,
// and features never import from each other.
const features = fs.readdirSync('src/features');
const restrict = (...group) => [
  'error',
  { patterns: [{ group, message: 'Import boundary: see eslint.config.mjs.' }] },
];

export default tseslint.config(
  // config/ holds backend templates and product/ + public/ hand-written static files; none is app source.
  { ignores: ['dist', 'coverage', 'config', 'docs', 'product', 'public'] },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['src/components/**', 'src/lib/**'],
    rules: { 'no-restricted-imports': restrict('@/app/*', '@/demo/*', '@/features/*') },
  },
  ...features.map((f) => ({
    files: [`src/features/${f}/**`],
    rules: {
      'no-restricted-imports': restrict('@/app/*', '@/demo/*', '@/features/*', `!@/features/${f}/**`),
    },
  })),
  {
    // Node scripts at the repo root: server.js and build.js are CommonJS, the tool configs are ES modules.
    files: ['*.{js,mjs,mts}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node, sourceType: 'module' },
  },
  {
    files: ['*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['*.mts'],
    extends: [...tseslint.configs.recommended],
  },
  prettier,
);
