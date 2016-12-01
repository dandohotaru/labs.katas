var webpack = require('webpack');
var html = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/vendor-manifest.json'),
    }),
    // new html({
    //   filename: "index.html",
    //   title: "Here be dragons",
    //   inject: "body",
    //   hash: "true",
    // })
  ]
};