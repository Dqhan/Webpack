const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './distDll/dll/'),
        library: '[name]_dll_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_dll_[hash]',
            path: path.join(__dirname, 'distDll/dll', '[name].manifest.json')
        })
    ]
}