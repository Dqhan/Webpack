const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { readFileSync: read } = require("fs");

module.exports = {
  mode: "development",
  entry: {
    app: "./demo.js"
  },
  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "[name]-[chunkhash].js",
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -10,
          chunks: "all",
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash:5].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "index",
      template: "./index.html",
      filename: "index.html",
      hash: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  // externals: {
  //     'react': 'react',
  //     'react-dom': 'react-dom'
  // },
};
