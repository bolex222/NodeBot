require('dotenv').config()
const config = require('../../config/config')

module.exports = {

  // METHOD WHICH CHECK IF COMMAND USER IS ALLOWED TO USE IT
  roleCheck (message, neededRoleId, command) {
    if (message.member.roles.has(neededRoleId)) {
      return true
    } else {
      message.channel.send(`sorry ${message.author}, you aren't allowed to do this`)
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
  }
}
