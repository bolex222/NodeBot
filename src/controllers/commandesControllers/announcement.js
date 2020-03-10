const Discord = require('discord.js')
const config = require('../../../config/config')
const middleware = require('../../middleware/middlewares')
const schedule = require('node-schedule')

require('dotenv').config()

const parsingAndCheckType = (array) => {
  let result
  const map1 = array[1].map(x => parseInt(x, 10))
  if (array[0] === 'date') {
    result = map1[0] >= new Date().getFullYear() && map1[0] <= new Date().getFullYear() + 1 && map1[1] >= 1 && map1[1] <= 12 && map1[2] >= 1 && map1[2] <= 31
  } else {
    result = map1[0] >= 0 && map1[0] <= 23 && map1[1] >= 0 && map1[1] <= 59
  }
  return [result, map1]
}

const stringToDate = (date) => {
  const arrayDateHour = date.split(' ')
  const arrayDate = arrayDateHour[0].split('/')
  const arrayHour = arrayDateHour[1].split(':')
  if (parsingAndCheckType(['date', arrayDate])[0] !== false && parsingAndCheckType(['hour', arrayHour])[0] !== false) {
    return new Date(parsingAndCheckType(['date', arrayDate])[1][0], parsingAndCheckType(['date', arrayDate])[1][1] - 1, parsingAndCheckType(['date', arrayDate])[1][2], parsingAndCheckType(['hour', arrayHour])[1][0], parsingAndCheckType(['hour', arrayHour])[1][1])
  } else {
    return false
  }
}

const generateEmbed = (message, announcement) => {
  return new Discord.RichEmbed()
    .setColor('#465bff')
    .setDescription(announcement)
    .setFooter(`by ${message.author.tag}`)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
}

module.exports = {
  async announcement (message, messageArray) {
    if (middleware.roleCheck(message, process.env.ALLOWED_ROLE, messageArray[0]) && middleware.argumentsCheck(message, messageArray, 2)) {
      const dateOrNot = stringToDate(messageArray[1])
      if (dateOrNot) {
        if (dateOrNot >= new Date()) {
          console.log(`${config.console.info} announcement from ${message.author.tag} will be send`)
          schedule.scheduleJob(dateOrNot, () => {
            try {
              message.channel.send(`${message.author}`)
              message.channel.send(generateEmbed(message, messageArray[2]))
              console.log(`${config.console.info} announcement from ${message.author.tag} posted`)
              message.delete()
            } catch (e) {
              console.log(`${config.console.error} announcement from ${message.author.tag} meet an error : ${e}`)
            }
          })
        } else {
          try {
            await message.channel.send(`attention ${message.author} tu ne peux pas renseigner une date déja passé`)
          } catch (e) {
            console.log(`${config.console.error} a message could not be sent`)
          }
        }
      } else {
        try {
          await message.channel.send(`attention ${message.author} la date que tu as renseigné ne réspecte pas le format AAAA/MM/JJ hh:mm`)
        } catch (e) {
          console.log(`${config.console.error} a message could not be sent`)
        }
      }
    }
  }
}
