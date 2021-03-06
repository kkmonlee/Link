require './polyfill'

_ = require 'lodash'
z = require 'zorium'
log = require 'clay-loglevel'

config = require './config'
HomePage = require './pages/home'
GameOverPage = require './pages/game_over'
ErrorReportService = require './services/error_report'

style = require './root.styl'

style.use()

window.addEventListener 'error', ErrorReportService.report

if config.ENV isnt config.ENVS.PROD
  log.enableAll()
else
  log.setLevel 'error'
  log.on 'error', ErrorReportService.report
  log.on 'trace', ErrorReportService.report

root = document.getElementById('app')
z.router.setRoot root
z.router.add '/', HomePage
z.router.add '/game-over', GameOverPage
z.router.go '/'

log.ingo 'App Ready'