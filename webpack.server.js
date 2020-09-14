const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglify-js-plugin');

module.exports = {
  entry: './index.js',
  devtool: "source-map",
  output: {
    filename: process.env.NODE_ENV == 'production' ? 'index.min.js' : 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: process.env.NODE_ENV == 'production' ? {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    })] 
  } : {},
  target: 'node',

  externals: [nodeExternals()],
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};