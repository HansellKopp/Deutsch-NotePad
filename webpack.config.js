const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srvDir = resolve(__dirname, 'src')
const buildDir = resolve(__dirname, 'build')

module.exports = {
  entry: `${srvDir}/index.js`,
  output: {
    path: `${buildDir}`,
    filename: 'build.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'standard-loader',
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:6]',
            camelCase: true
          }
        }]
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srvDir}/index.html`,
    }),
    new DashboardPlugin(),
    new ExtractTextPlugin('styles.css'),
  ]
}
