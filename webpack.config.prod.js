var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var alias = require('./webpackModuleAlias')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist', 'lib'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },
  target: 'electron',
  resolve: {
    alias: alias
  },
  externals: [
    'atom',
    './originalRequire'
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env' : {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {
        test: /^.*environment\.js$/,
        loader: 'string-replace',
        include: path.join(__dirname, 'node_modules/yeoman-environment/lib'),
        query: {
          search: 'return require.resolve(untildify(moduleId));',
          replace: 'return require("./originalRequire")(untildify(moduleId))'
        }
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [path.join(__dirname, 'src')],
        loader: 'file',
        query: {name: 'images/[name].[ext]'}
      },
      {
        test: /\.less/,
        loader: 'style!css!postcss!less',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(mp4|webm|pdf)(\?.*)?$/,
        include: path.join(__dirname, 'src'),
        loader: 'url',
        query: {
          limit: 10000,
          name: 'media/[name].[ext]'
        }
      }
    ]
  },
  postcss: function() {
    return [autoprefixer, cssnano]
  }
}
