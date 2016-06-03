import webpack from 'webpack';

import config from './webpack.prod.frontend.config.babel';
import pathConfig from './webpack.path.config.babel';

config.module.loaders = config.module.loaders.filter(loader => loader.id !== 'css');

config.module.loaders.push({
  test: /\.styl$/,
  // the stylus-loader resolves paths in reversed order - so reverse root
  loader: `style!css?sourceMap!postcss!stylus?paths[]=${pathConfig.root.slice().reverse().join(',paths[]=')}`,
  include: pathConfig.client
});

// exclude uglify
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  })
];

export default config;
