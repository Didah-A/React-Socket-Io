var path = require('path');
module.exports = {
  entry: __dirname + '/src',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
}
