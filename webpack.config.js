const CopyWebpackPlugin = require('copy-webpack-plugin');

// bundling alexa-sdk into 1 file
module.exports = {
  entry: {
    'alexa-sdk': './node_modules/alexa-sdk/index.js',
  },
  output: {
    filename: 'src/[name]-bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './node_modules/node-fetch/lib/index.js', to: './src/node-fetch-bundle.js' }]),
  ],
};
