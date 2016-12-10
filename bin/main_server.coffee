#!/usr/bin/env coffee
path = require 'path'

app = require '../server'
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'

webpackDevPort = 304
webpackDevHostName = 'localhost'

app.all '/*', (req, res, next) ->
  res.header(
    'Access-Control-Allow-Origin', "//#{webpackDevHostname}:#{webpackDevPort}"
  )
  res.header 'Access-Control-Allow-Headers', 'X-Requested-With'
  next()

app.listen 3000, ->
  console.log 'Listening on port %d', 3000

entries = [
  "webpack-main-server/client?http://#{webpackDevHostName}:#{webpackDevPort}"
  'webpack/hot/main-server'
]
entries = entries.concat ['./src/root']

new WebpackDevServer webpack({
  entry: entries
  output:
    path: __dirname,
    filename: 'bundle.js',
    publicPath: "//#{webpackDevHostName}:#{webpackDevPort}/js/"
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}),
  publicPath: "//#{webpackDevHostname}:#{webpackDevPort}/js/"
  hot: true
.listen webpackDevPort, (err) ->
  if err
    console.log err
  console.log 'Webpack listening on port %d', webpackDevPort