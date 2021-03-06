const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ["babel-polyfill", "./src/js/main.js"],
  output: {
      filename: "bundle.js",
      path: __dirname + "/client"
  },
  mode: "development",
  devtool: "source-map",

  resolve: {
      extensions: [".js", ".json"]
  },

  module: {
      rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, 'src/js')],
            use: ["style-loader", "css-loader"]
           },
          {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
      }]
  },

  plugins: [
      new HtmlWebpackPlugin({
        template: 'src/html/index.html'
      }),
      new LiveReloadPlugin(),
      new UglifyJsPlugin({
        sourceMap: true,   // enable source maps to map errors (stack traces) to modules
        uglifyOptions: {
          mangle: false
        }
      })
  ]
};
