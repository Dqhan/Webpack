const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './demo.js',
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "[name]-[chunkhash].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    'less-loader',

                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendors: false,
                common: {
                    test: /\.(s*)js$/,
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 0,
                    name: 'common',
                    enforce: true,
                    priority: -11
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            hash: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./distDll/dll/react.manifest.json')
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        })
    ],

}