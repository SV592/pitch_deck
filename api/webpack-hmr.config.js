const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function(options) {
  return {
    ...options,
    entry: './src/main.ts',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
      libraryTarget: 'commonjs2',
    },
    externals: [nodeExternals()],
  };
};