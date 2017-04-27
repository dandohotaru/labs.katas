const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');

var config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: "./app.js",
    vendor: "moment"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: __dirname + '/src',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: "css-loader"
        }),
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
  ]
};

module.exports = config;