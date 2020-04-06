require('dotenv').config()
const messages = require('../utils/messages')
const config = require('../../config/config')

module.exports = {
  sayHello (member, bot) {
    const memberId = member.id

    bot.channels.get(process.env.WELCOME_CHANNEL).send(`salut ${member} ${messages.hello.specifiqueWelcome1}`)
    console.log(`${config.console.info} ${member.name} joined the server`)
  }
}
