const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const customPlugins = [
    new HtmlWebpackPlugin({
        title: 'blast game',
        template: path.resolve(__dirname, './src/template.html'),
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({
        context: path.resolve(__dirname, '../'),
        extensions: ['js', 'ts'],
        failOnError: false,
        failOnWarning: false,
    })
];

const customRules = [
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
    }
];

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: customPlugins,
    module: {
        rules: customRules
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        open: false,
        https: false,
        compress: true,
        hot: true,
        port: 1236,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        }
    },
};