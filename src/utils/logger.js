const SimpleNodeLogger = require('simple-node-logger')

module.exports = {
  opts: {
    logFilePath: 'myLogFile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log: SimpleNodeLogger
}
