module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'always'],
    'import/no-dynamic-require': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'linebreak-style': 'off',
    'no-lonely-if': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        bracketSameLine: true,
        // bracketSpacing: false,
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
  },
};
