var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

            }
        ]
    },
    plugins: [
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