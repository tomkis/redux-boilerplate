import webpack from 'webpack';

import config from './webpack.prod.frontend.config.babel';

// exclude uglify
config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  })
];

export default config;
