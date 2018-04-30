const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.shared.js')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
})