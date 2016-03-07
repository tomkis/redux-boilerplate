/*eslint no-var: 0 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      include: path.join(__dirname, '../src')
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '../src')
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/server/static', to: './client'},
      {from: './src/server/views/', to: './views'},
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
