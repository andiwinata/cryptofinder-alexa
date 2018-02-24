// bundling alexa-sdk into 1 file
module.exports = {
  entry: './node_modules/alexa-sdk/index.js',
  output: {
    filename: 'src/alexa-sdk-bundle.js',
    libraryTarget: 'commonjs2',
  },
};
