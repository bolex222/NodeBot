require('dotenv').config()
const messages = require('../utils/messages')

module.exports = {
  sayHello (member, bot) {
    const memberId = member.id
    console.log(memberId)

    bot.channels.get(process.env.WELCOME_CHANNEL).send(`salut ${member} ${messages.hello.specifiqueWelcome1}`)
  }


}