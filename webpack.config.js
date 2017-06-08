const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {

  let config = {
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
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.(png|gif|jpg)$/,
          loader: 'url-loader',
          options: { limit: '25000' }
        },
        {
          test: /\.(ttf|eot|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    devServer: {
      port: 8080,
      contentBase: path.resolve(__dirname, './src'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    devtool: (() => {
      return env.target === "production"
        ? "hidden-source-map"
        : "eval-source-map"
    })(),
  };

  console.log(`Target: ${env.target}`);
  console.log(`Platform: ${env.platform}`);
  console.log(`Maps: ${config.devtool}`);

  return config;
};