const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const nodeExternals = require('webpack-node-externals');
const { srcRoot, outputPath, serverRoot } = require('./config')
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: {
        server: path.resolve(serverRoot, '../server.js')
    },
    output: {
        path: path.resolve(outputPath, './server/'),
        filename: '[name].js',
        chunkFilename: '[name].[hash:8].js',
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    externals: [
        nodeExternals({
            whitelist: [/\.css$/i]
        })],
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: [
                    {
                        loader: 'happypack/loader?id=happyBabel'
                    }
                ],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'ignore-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'ignore-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },

    plugins: [
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new ProgressBarPlugin({
            format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false
        })
    ]
};
