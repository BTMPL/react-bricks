const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react','react-dom'],
  },
  output: {
    filename: 'brick.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'dll',
  },
  plugins: [new webpack.DllPlugin({
    name: 'dll',
    path: path.resolve(__dirname, '../dist/brick-manifest.json')
  })]
};