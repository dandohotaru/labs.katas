const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {

  // Input
  console.log("Target: " + env.target);
  console.log("Platform: " + env.platform);

  // Config
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
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
    },
    devtool: "eval-source-map",
  };

  // Customize
  if (env.target === "production") {
    config.devtool = "";
    console.log("Maps: disabled");
  }

  return config;
};