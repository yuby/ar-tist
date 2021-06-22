const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "build.js",
  },
  mode: "development",
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html"
    })
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  }
};