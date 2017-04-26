const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');

var config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: "./main.js",
    vendor: "moment"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: __dirname + '/src', // `__dirname` is root of the project
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
    })
  ]
};

module.exports = config;