const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    index: "./src/index"
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "AjaxUtil"
  },
  devtool: "cheap-source-map",
  module: {
    loaders: [
      {
        test: /\.js|jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // new UglifyJSPlugin({
    //   beautify: true,
    //   sourceMap: true
    // })
  ],
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  }
};
