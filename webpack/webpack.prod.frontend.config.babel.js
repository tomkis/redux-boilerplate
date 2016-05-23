import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import pathConfig from './webpack.path.config.babel';

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
      include: pathConfig.client
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: pathConfig.client
    }, {
      test: /\.styl$/,
      // the stylus-loader resolves paths in reversed order - so reverse root
      loader: `
        style!css?sourceMap!postcss!stylus?paths[]=
        ${pathConfig.root.slice().reverse().join(',paths[]=')}
      `,
      include: pathConfig.client
    }]
  },
  resolve: {
    extensions: ['', '.js'],
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
    })
  ]
};
