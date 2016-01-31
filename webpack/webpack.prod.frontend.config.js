var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [ './src/client/main.jsx'] ,
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: 'client.js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      include: path.join(__dirname, '../src/client')
    }],
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '../src/client')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
