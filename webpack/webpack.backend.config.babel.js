import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import config from './webpack.prod.backend.config.babel';

// replace uglify with source maps
config.plugins = [
  new CopyWebpackPlugin([
    { from: './src/server/static/', to: './client' },
    { from: './src/server/views/', to: './views' },
  ]),
  new webpack.BannerPlugin(
    'require("source-map-support").install();',
    { raw: true, entryOnly: false })
];

export default config;
