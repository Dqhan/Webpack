const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const fs = require('fs');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "bundle-[chunkhash].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',// 与 MiniCssExtractPlugin.loader 冲突 
                    'css-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",  // creates style nodes from JS strings
                    'css-loader',    // translates CSS into CommonJS
                    'less-loader',     // compiles Less to CSS
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        // options: {
                        //     limit: 1000 * 100    //不加限制图片过大会直接打到build下 导致找不到图片文件
                        // }
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        /**
         *  剥离CSS文件
         */
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        /** 
         *  动态引入css，less，js等文件
         */
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './index.html'
        }),
        /**
         * 动态删除多余的js css less等等
         */
        new CleanWebpackPlugin(),
        /**
         * 动态引入manifest.json
         */
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./distDll/dll/react.manifest.json')
        }),
        /**
         * 缓存加速二次构建速度
         */
        new HardSourceWebpackPlugin({
            cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
            configHash: function (webpackConfig) {
                // node-object-hash on npm can be used to build this.
                return require('node-object-hash')({ sort: false }).hash(webpackConfig);
            },
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['package-lock.json', 'yarn.lock'],
            },
            info: {
                // 'none' or 'test'.
                mode: 'none',
                // 'debug', 'log', 'info', 'warn', or 'error'.
                level: 'debug',
            },
            cachePrune: {
                maxAge: 2 * 24 * 60 * 60 * 1000,
                sizeThreshold: 50 * 1024 * 1024
            },
        }),
        /**
         * 开启 Scope Hoisting
         */
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new BundleAnalyzerPlugin(),
        // function () {
        //     this.plugin('done', function (statsData) {
        //         const stats = statsData.toJson();
        //         console.log(statsData);
        //         fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(stats));
        //     })
        // }
    ],
    resolve: {
        // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
        mainFields: ['jsnext:main', 'browser', 'main']
      },
    // externals: {
    //     react: 'react',
    //     'react-dom': 'react-dom'
    // },
}