const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './util.js',
    },
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "[name]-[chunkhash].js",
        libraryTarget: 'umd',
        library: 'util',
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            hash: true
        }),
    ],
    // externals: {
    //     'react': 'react',
    //     'react-dom': 'react-dom'
    // }
    externals: {
        // jquery: {
        //     root: 'jquery',
        //     commonjs: 'jquery',
        //     commonjs2: 'jquery',
        //     amd: 'jquery',
        // },
    }
}