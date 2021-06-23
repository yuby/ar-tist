const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./app/index.tsx"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  plugins: [
    new CopyPlugin([
      path.resolve(__dirname, "app/assets")
    ]),

    new HtmlWebpackPlugin({
      template: 'app/public/index.html'
    }),

    new WasmPackPlugin({
      crateDirectory: __dirname,
      outName: "ar-tist",
      watchDirectories: [
        path.resolve(__dirname, "src")
      ]
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  }
};
