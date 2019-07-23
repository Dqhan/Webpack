var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "bundle-[chunkhash].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',// 与 MiniCssExtractPlugin.loader 冲突 
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",  // creates style nodes from JS strings
                    'css-loader',    // translates CSS into CommonJS
                    'less-loader',     // compiles Less to CSS
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000 * 100
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        /**
         *  剥离CSS文件
         */
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        /** 
         *  动态引入css，less，js等文件
         */
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './index.html'
        }),
        /**
         * 动态删除多余的js css less等等
         */
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        // function () {
        //     this.plugin('done', function (statsData) {
        //         const stats = statsData.toJson();
        //         console.log(statsData);
        //         fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(stats));
        //     })
        // }
    ]
}