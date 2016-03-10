/*eslint no-var: 0 */
var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
const pathConfig = require('./webpack.path.config');

module.exports = {
  entry: ['./src/client/default/main.jsx'],
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: 'client.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      include: pathConfig.client
    }],
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: pathConfig.client
    }, {
      test: /\.styl$/,
      // the stylus-loader resolves paths in reversed order - so reverse root
      loader: 'style!css?sourceMap!postcss!stylus?paths[]=' + pathConfig.root.slice().reverse().join(',paths[]='),
      include: pathConfig.client
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: pathConfig.root,
    alias: {
      default: pathConfig.default,
      theme: pathConfig.theme
    }
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
