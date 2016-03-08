/*eslint no-var: 0 */
var path = require('path');

const config = require('./webpack.prod.frontend.config');

// adding hot reload and source maps
config.module.loaders = [{
  test: /\.jsx$|\.js$/,
  loaders: ['react-hot', 'babel'],
  include: path.join(__dirname, '../src/client')
}, {
  test: /\.styl$/,
  loader: 'style!css?sourceMap!postcss!stylus'
}];

//exlclude uglify
config.plugins = [];

module.exports = config;
