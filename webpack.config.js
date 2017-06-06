const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');

// Config
var config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: "./app.js",
    vendor: ["moment"]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader"
      },    
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: "css-loader"
        }),
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre"
      }
    ],
  },
  plugins: [
    new htmlPlugin({
      title: 'Demo',
      favicon: './assets/favicon.ico',
      template: './index.html',
      inject: 'body',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new extractPlugin({
      filename : 'app.[chunkhash].css'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'), 
  },
  devtool: "eval-source-map"
};

// Customize
var environment = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "notdefined";
console.log("Env: " + environment);

if (environment ===  "production") {
    config.devtool = "";
    console.log("Maps: disabled");
}

// Export
module.exports = config;