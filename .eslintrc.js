
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    './node_modules/@ngc-corp/eslint-rules/eslint/javascript.js'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        './node_modules/@ngc-corp/eslint-rules/eslint/typescript.js',
      ],
      plugins: [
        '@typescript-eslint',
      ],
    }
  ],
};
