/**
 * Webpack configuration for active development
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin')

const { fromDist } = require('../utils/paths.js')
const baseConfig = require('./config.base.js')
const htmlTemplate = require('./helpers/htmlTemplate.js')

module.exports = merge(baseConfig, {
  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniHtmlWebpackPlugin({
      context: { title: 'Mamba Application' },
      template: htmlTemplate,
    }),
  ],

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },

  devServer: {
    contentBase: fromDist(),
    compress: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hot: true,
  },
})
