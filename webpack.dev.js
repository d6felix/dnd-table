const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require("path");
const contentPath = path.resolve(__dirname, "public");
const loclahost = "localhost";
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ]
  },
  devServer: {
    host: loclahost,
    port: 3000,
    static: contentPath,
    hot: true,
    historyApiFallback: true,
  },
});