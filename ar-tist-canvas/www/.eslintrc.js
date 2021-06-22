module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: ['./tsconfig.eslint.json']
  },
  ignorePatterns: [".eslintrc.js", "webpack.*.js"],
};