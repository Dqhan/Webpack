const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readFileSync: read } = require('fs');

module.exports = {
    mode: 'development',
    entry: {
        util: './util.js',
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: '[name].dist.js',
        libraryTarget: 'window',
        library: 'util',
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
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // templateContent: () => {
            //     let template = path.resolve(__dirname, './index.html');
            //     return read(template)
            //         .toString()
            //         .replace('$dll$', '../vendor/dll.js');
            // },
            title: 'index',
            template: './index.html',
            filename: 'index.html',
            chunks: ['util'],
            hash: true
        })
    ],
    // externals: {
    //     'react': 'react',
    //     'react-dom': 'react-dom'
    // }
    externals: {
        jquery: {
            root: 'jquery',
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
        },
    },
}