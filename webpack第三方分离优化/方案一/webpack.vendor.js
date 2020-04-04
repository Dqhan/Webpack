const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        app: './vendorentry.js',
    },
    output: {
        path: path.resolve(__dirname, './vendor/'),
        filename: "dll.js"
    },
    module: {
        rules: [
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
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendors: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}