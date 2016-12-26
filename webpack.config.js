/*eslint-env node*/
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pluginsProd = debug ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
];

var plugins = [new ExtractTextPlugin('./style.css')].concat(pluginsProd);

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './js/client.js',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader!sass-loader')
      }
    ]
  },
  output: {
    path: __dirname + '/build/',
    filename: 'client.min.js'
  },
  plugins
};
