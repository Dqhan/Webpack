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
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              "import",
              {
                libraryName: "dqhan",
                // libraryDirectory: 'lib',
                camel2DashComponentName: false, // 是否需要驼峰转短线
                camel2UnderlineComponentName: false, // 是否需要驼峰转下划线
                customName: (name) => {
                  return `Lib/Components/${name}`; // 核心配置 根据你自己的组件目录配置
                },
                style: () => {
                  return false;
                },
              },
            ],
            //...others
          ],
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
