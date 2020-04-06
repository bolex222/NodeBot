// IMPORTS
require('dotenv').config()
const Discord = require('discord.js')
const config = require('../config/config')
const messages = require('./utils/messages')
const welcomeController = require('./controllers/welcomeController')
const loginController = require('./controllers/loginController')
const commandController = require('./controllers/commandesControllers')

// BOT DECLARATION
const bot = new Discord.Client({ disableEveryone: false })

const startBot = async () => {
  try {
    await loginController.loginBot(bot)
    console.log(`${config.console.info} bot connected`)
  } catch (e) {
    console.log(`${config.console.error} bot can't connect`)
    return
  }

  // SEND A MESSAGE IF EVERY THINK IS OK
  bot.on('ready', () => {
    console.log('bot pret')
    bot.channels.get(process.env.TEST_CHANNEL).send(messages.hello.start)
    console.log('bot pret')
  })

  // RECEIVING NEW GUILD MEMBER
  bot.on('guildMemberAdd', member => {
    console.log('hello')
    welcomeController.sayHello(member, bot)
  })

  // CHECK EVERY MESSAGE
  bot.on('message', async message => {
    if (message.content.startsWith(process.env.PREFIX) || !message.author.bot || message.channel.type !== 'dm') {
      try {
        await commandController.redirect(message, bot)
      } catch (e) {
        console.log(`${config.console.error} can't ask any command, error: ${e}`)
      }
    }
  })
}

// CALL BOT STARTER METHOD
startBot()
