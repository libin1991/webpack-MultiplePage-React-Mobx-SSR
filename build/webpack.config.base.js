const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { srcRoot, outputPath, entry } = require('./config')

const baseConfig = {
    entry,
    output: {
        path: outputPath,
        filename: 'js/[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../client'),
            '@component': path.resolve(__dirname, '../client/component'),
            '@json': path.resolve(__dirname, '../client/json')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: srcRoot
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|svg)$/,
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
    plugins: [
        new CopyPlugin([{
            from: path.resolve(srcRoot, './json'),
            to: path.resolve(outputPath, './json'),
            force: true
        }])
    ]
}

module.exports = baseConfig


