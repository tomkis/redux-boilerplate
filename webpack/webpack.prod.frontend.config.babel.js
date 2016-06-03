import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import pathConfig from './webpack.path.config.babel';
import babelQuery from '../babel/babelquery';

export default {
  entry: ['./src/client/default/main.js'],
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      include: path.join(__dirname, '../src')
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, '../src'),
      query: babelQuery
    }, {
      id: 'css',
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(['css', 'postcss', `stylus?paths[]=${pathConfig.root.slice().reverse().join(',paths[]=')}`]),
      include: pathConfig.client
    }]
  },
  resolve: {
    extensions: ['', '.js', '.styl'],
    root: pathConfig.root,
    alias: {
      default: pathConfig.default,
      theme: pathConfig.theme
    }
  },
  postCss: () => [autoprefixer],
  plugins: [
    /** react and redux must be minified in production env to be build without dev assets
      and to include peformace opts
    */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
