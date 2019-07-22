var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "source.js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options: {

                    // }
                }
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
            // {
            //     text: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         loader: 'css-loader'
            //     })
            // }
            // ,{
            //     text: /\.less$/,
            //     use: ExtractTextPlugin.extract({
            //         loader
            //     })
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
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