gulp = require 'gulp'
wtf = require 'gulp-wtf'

#start server.coffee
gulp.task 'dev', ->
  wtf {script: 'bin/main_server.coffee', ext: 'null', ignore: ['**/*.*']}