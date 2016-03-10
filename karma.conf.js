const pathConfig = require('./webpack/webpack.path.config');
const specFileMatch = pathConfig.client + '/**/*.spec.*';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    browsers: ['PhantomJS'],
    reporters: ['nyan', 'junit'],
    singleRun: true,
    files: [
      specFileMatch
    ],
    webpack: {
      module: {
        loaders: [{
          test: /\.jsx$|\.js$/,
          exclude: /node_modules/,
          loaders: ['babel']
        }]
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: pathConfig.root,
        alias: {
          default: pathConfig.default,
          theme: pathConfig.theme
        }
      }
    },
    preprocessors: {
      [specFileMatch]: ['webpack']
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-nyan-reporter')
    ]
  });
};
