/*eslint no-var: 0 */
var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/client/main.jsx'],
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
    }, {
      test: /\.styl$/,
      loader: 'style!css!stylus'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: function() {
    return [autoprefixer];
  },
  plugins: [
    //see https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md#exclude-devtools-from-production-builds
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
