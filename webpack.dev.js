const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    stats: "minimal",
    watchContentBase: true,
    historyApiFallback: true,
    open: false,
    hot: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
})