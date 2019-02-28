const alias = require('../alias');

module.exports = {
  name: 'client',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias,
  },
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /fonts.*\.(woff(2)?|ttf|eot|svg)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../assets/fonts',
        },
      }],
    }, {
      test: /icons.*\.svg$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
        },
      }],
    }, {
      test: /\.(jpg|png)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../assets/images',
        },
      }],
    }],
  },
};