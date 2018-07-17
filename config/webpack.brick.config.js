const path = require('path');
const webpack = require('webpack');
const brickName = process.env.BRICK.trim();

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/brick.js'),
  output: {
    filename: `${brickName}.js`,
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024
          }        
        }]
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.resolve(__dirname, '../dist/brick-manifest.json')),
    }),    
    new webpack.DefinePlugin({
      brickName: `"${brickName}"`,
    }),    
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      '~brick': path.resolve(__dirname, `../src/bricks/${brickName}`)
    }    
  }
};

module.exports = config;