const config = require('../../../config/config')
const help = require('./help')
const announcement = require('./announcement')
module.exports = {
  async redirect (message, bot) {
    const messageArray = message.content.split(config.separator)
    const command = messageArray[0]

    switch (command) {
      case `${config.prefix}help`:
        try {
          await help.helpCommand(message, messageArray)
        } catch (e) {
          console.log(`${config.console.error} can't ask for help command, error: ${e}`)
        }
        break
      case `${config.prefix}annonce`:
        try {
          await announcement.announcement(message, messageArray, bot)
        } catch (e) {
          console.log(`${config.console.error} can't ask for annonce command, error: ${e}`)
        }
        break
    }
  }
}
