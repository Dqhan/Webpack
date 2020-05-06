const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js",
  // entry: "./app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // chunkFilename: "[name].bundle.js",
  },
  plugins: [new CleanWebpackPlugin()],
};
