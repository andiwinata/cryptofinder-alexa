// bundling alexa-sdk into 1 file
// also parses alexa-sdk to es5
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'src/alexa-sdk-bundle.js',
    libraryTarget: 'commonjs2',
  },
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
};
