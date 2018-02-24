const defaultConfig = require('./webpack.config');
// bundling alexa-sdk into 1 file
module.exports = Object.assign({}, defaultConfig, {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
    ],
  },
});
