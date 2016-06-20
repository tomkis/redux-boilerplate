import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import babelQuery from '../babel/babelquery';

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(entry => ['.bin'].indexOf(entry) === -1)
  .forEach(module => {
    nodeModules[module] = `commonjs ${module}`;
  });

export default {
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
      loader: 'babel',
      include: path.join(__dirname, '../src'),
      query: babelQuery
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/server/static', to: './client' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
