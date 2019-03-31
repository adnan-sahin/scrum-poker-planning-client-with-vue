module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: ['off', 'single'],
    'linebreak-style': 0,
    'comma-dangle': ['error', 'never'],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: [] }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
