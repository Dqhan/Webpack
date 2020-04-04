const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app1: './app1.js',
        app2: './app2.js'
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
                        loader: 'css-loader',
                        // options: {
                        //     sourceMap: true,
                        //     modules: true,
                        //     localIdentName: '[name]---[local]---[hash:base64:5]'
                        // }
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
                        loader: 'babel-loader',
                        options: {
                            // cacheDirectory: path.join(__dirname,'./build/', 'babel_cache')
                            // happyPackMode: true,
                            // transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            "name": "manifest"
        },
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
                },
                // vendors: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: "vendors",
                //     priority: -10,
                //     chunks: 'all',
                //     reuseExistingChunk: true,
                //     enforce: true
                // },
                style: {
                    name: 'style',
                    test: /\.less$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        runtimeChunk:{
            name:'manifest'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index1',
            template: './index1.html',
            filename: 'index1.html',
            chunks: ['app1', 'common'],
            // hash: true
        }),
        new HtmlWebpackPlugin({
            title: 'index2',
            template: './index2.html',
            filename: 'index2.html',
            chunks: ['app2', 'common'],
            // hash: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./distDll/dll/react.manifest.json')
        })
    ],

}