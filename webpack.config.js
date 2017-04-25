const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');

var config = {
  context: path.resolve(__dirname, './src'),
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: __dirname + '/src', // `__dirname` is root of the project
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader"
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
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
  ]
};

module.exports = config;