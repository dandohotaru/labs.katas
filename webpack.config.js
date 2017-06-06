const path = require('path');
const webpack = require('webpack');

// Config
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

// Customize
var environment = process.env.NODE_ENV.trim();
console.log("Env: " + environment);

if (environment ===  "production") {
    config.devtool = "";
    console.log("Maps: disabled");
}

// Export
module.exports = config;