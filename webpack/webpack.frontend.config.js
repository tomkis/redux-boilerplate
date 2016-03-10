/*eslint no-var: 0 */
var path = require('path');

const config = require('./webpack.prod.frontend.config');
const pathConfig = require('./webpack.path.config');

// adding hot reload and source maps
config.module.loaders = [{
  test: /\.jsx$|\.js$/,
  loaders: ['react-hot', 'babel'],
  include: pathConfig.client
}, {
  test: /\.styl$/,
  // the stylus-loader resolves paths in reversed order - so reverse root
  loader: 'style!css?sourceMap!postcss!stylus?paths[]=' + pathConfig.root.slice().reverse().join(',paths[]=')
}];

//exclude uglify
config.plugins = [];

module.exports = config;
