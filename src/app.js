// IMPORTS
require('dotenv').config()
const Discord = require('discord.js')
const messages = require('./utils/messages')
const welcomeController = require('./controllers/welcomeController')
const bot = new Discord.Client()
const loginToken = process.env.LOGIN_TOKEN


// CONNEXION TO DISCORD SERVER
bot.login(loginToken)
  .then(() => {
  console.log(messages.hello.consoleStart)
})
  .catch(() => {
    console.log(messages.error.startingError)
  })

//SEND A MESSAGE IF EVERY THINK IS OK
bot.on('ready', () => {
  try {
    bot.channels.get(process.env.TEST_CHANNEL).send(messages.hello.start)
  } catch (e) {
    console.log('zut')
  }

})

bot.on('message', message => {
  if (message.content === '$*help')
    message.channel.send(messages.help)

})

bot.on('guildMemberAdd', member => {
  console.log('hello')
  welcomeController.sayHello(member, bot)
})