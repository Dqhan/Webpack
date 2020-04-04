const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const fs = require('fs');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: './myloader.js'
                    }
                ]
            }
        ]
    },
    plugins: [
   
    ],
}