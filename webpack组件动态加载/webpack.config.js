const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        test: /\.css$/,
        loader: "css-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // options: {
        //   plugins: [
        //     [
        //       "import",
        //       {
        //         libraryName: "antd",
        //         libraryDirectory: "es",
        //         style: false,
        //       },
        //     ],
        //   ],
        // },
        options: {
          plugins: [
            [
              "import",
              {
                libraryName: "test",
                camel2DashComponentName: false,
                camel2UnderlineComponentName: false,
                customName: (name) => {
                  console.log(name);
                  return `./AUI/Components/${name}`;
                },
                style: false,
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "index",
      template: "./index.html",
      filename: "index.html",
      hash: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
};
