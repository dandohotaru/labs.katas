const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: ['babel-polyfill', "./src/main.js"],
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  stats: {
    colors: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.hbs$/,
        use: [{
          loader: "handlebars-loader",
          options: { 
            helperDirs: path.resolve(__dirname, "./src/app/shared/helpers") 
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devtool: 'source-map',
  watch: true
};

// output > publicPath: '/'
// resolve > extensions: ['.ts', '.js', '.json'],