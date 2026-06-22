module.exports = [
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'warn',
      indent: ['error', 2]
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        setTimeout: 'readonly'
      }
    }
  }
];