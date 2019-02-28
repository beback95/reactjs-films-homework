const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    client: path.resolve(__dirname, '../../src/client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../../build/js/'),
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            camelCase: true,
            modules: true,
            minimize: true,
            importLoaders: 2,
            localIdentName: '[hash:base64:10]',
          },
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'compressed',
          },
        }],
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../../'),
      verbose: true,
      dry: false,
    }),
    new ExtractTextPlugin('../../build/css/styles.css'),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'reactjs-films-homework',
      short_name: 'films',
      description: 'reactjs-films-homework',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/assets/images/main-icon.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
  ],
});
