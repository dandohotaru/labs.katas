var webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['./src/vendor.js']
  },
  output: {
    path: './dist',
    filename: 'vendor.bundle.js',
    library: 'vendor_lib'
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: 'dist/vendor-manifest.json',
  })]
};