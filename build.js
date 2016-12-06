var webpack = require('webpack');
var config = require('./webpack.config.prod');
var fs = require('fs-plus')
var path = require('path')

webpack(config, function(err, stats) {
  console.log(stats.errors);
});
