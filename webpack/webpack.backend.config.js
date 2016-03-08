/*eslint no-var: 0 */
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./webpack.prod.backend.config');

//replace uglify with source maps
config.plugins = [
  new CopyWebpackPlugin([
    {from: './src/server/static/', to: './client'},
    {from: './src/server/views/', to: './views'},
  ]),
  new webpack.BannerPlugin(
    'require("source-map-support").install();',
    { raw: true, entryOnly: false })
];

module.exports = config;
