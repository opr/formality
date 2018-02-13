const webpack = require('webpack'),
    path = require('path'),
    WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    entry: {
        'app': [
            'babel-polyfill',
            './assets/js/react/index.jsx',
            './assets/js/modules/index.js'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false,
            minimize: true
        })
    ],
    output: {
        path: path.resolve(__dirname, './assets/js', 'dist'),
        publicPath: './assets/js/dist/',
        filename: 'bloc.min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
