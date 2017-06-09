const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');
const chunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = (env = {}) => {

  let config = {
    context: path.resolve(__dirname, './src'),
    entry: {
      bundle: './app.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[chunkhash].js',
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
          use: extractPlugin.extract({
            use: [
              { loader: 'css-loader' }
            ]
          }),
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
    plugins: [
      new extractPlugin({
        filename : 'styles.[chunkhash].css',
      }),
      new chunkPlugin({
        names: 'vendor',
        minChunks: (module) => {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new chunkPlugin({
        names: 'manifest',
      }),
      new htmlPlugin({
        title: 'Demo',
        favicon: './assets/favicon.ico',
        template: './index.html',
        inject: 'body',
      }),
    ],
    devServer: {
      port: 8080,
      contentBase: path.resolve(__dirname, './src'),
      watchOptions: {
        aggregateTimeout: 500,
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