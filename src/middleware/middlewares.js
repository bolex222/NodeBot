require('dotenv').config()
const config = require('../../config/config')

module.exports = {

  // METHOD WHICH CHECK IF COMMAND USER IS ALLOWED TO USE IT
  roleCheck (message, neededRoleId, command) {
    if (message.member.roles.has(neededRoleId)) {
      return true
    } else {
      message.channel.send(`sorry ${message.author}, tu n'a pas le role necessaire pour la commande ${command}`)
      console.log(`${config.console.info} ${message.author.tag} tried command "${command}" but don't have the needed role`)
      return false
    }
  },
  // METHOD WHICH CHECK IF THERE ISN'T MISSING ARGUMENT
  argumentsCheck (message, arrayMessage, nbArg) {
    if (arrayMessage.length - 1 === nbArg) {
      return true
    } else {
      message.channel.send(`désolé ${message.author} le nombre d'arguments que tu as renseigné n'est pas bon, utilise la commande \`\`\` ${config.prefix}help${config.separator}${arrayMessage[0].substring(1)}\`\`\` pour obtenir de l'aide`)
      console.log(`${config.console.info} ${message.author.tag} tried command ${arrayMessage[0]} but there is missing arguments`)
      return false
    }
  },

  channelCheck (message, arrayMessage, bot) {
    if (message.channel.id === process.env.ANNOUNCEMENT_ADMIN_CHANNEL) {
      return true
    } else {
      message.channel.send(`désolé ${message.author} tu n'est pas authorisé a poster ça depuis ce channel, essay depuis le channel ${bot.channels.get(process.env.ANNOUNCEMENT_ADMIN_CHANNEL)} .Si tu ne vois pas le channel contact un administrateur du serveur :)`)
      console.log(`${config.console.info} ${message.author.tag} tried command ${arrayMessage[0]} but he asked it from an unauthorized channel`)
      return false
    }
  }
}
