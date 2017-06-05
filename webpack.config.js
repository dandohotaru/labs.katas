const path = require('path');
const webpack = require('webpack');

var config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    },
    devtool: "eval-source-map",
};

if (process.env.NODE_ENV == "production") {
  config.devtool = "";

  // Add more configuration for production here like
  // SASS & CSS loaders
  // Offline plugin
  // Etc,
}

module.exports = config;