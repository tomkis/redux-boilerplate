import config from './webpack.prod.frontend.config.babel';
import pathConfig from './webpack.path.config.babel';

// adding hot reload and source maps
config.module.loaders = [{
  test: /\.js$/,
  loaders: ['react-hot', 'babel'],
  include: pathConfig.client
}, {
  test: /\.styl$/,
  // the stylus-loader resolves paths in reversed order - so reverse root
  loader: `
    style!css?sourceMap!postcss!stylus?paths[]=
    ${pathConfig.root.slice().reverse().join(',paths[]=')}
  `
}];

// exclude uglify
config.plugins = [];

export default config;
