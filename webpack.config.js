const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const cssModules = 'modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'app.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          `css-loader?${cssModules}`
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    }),
    new ExtractTextWebpackPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
};
