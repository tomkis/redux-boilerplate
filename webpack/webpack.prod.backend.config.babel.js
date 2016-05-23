import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';

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
      loaders: ['babel'],
      include: path.join(__dirname, '../src')
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CopyWebpackPlugin([
      { from: './src/server/static', to: './client' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
