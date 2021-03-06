const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        app: './vendorentry.js',
    },
    output: {
        path: path.resolve(__dirname, './vendor/'),
        filename: "dll.js",
        library:'util',
        libraryTarget: 'window'
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
    }
}