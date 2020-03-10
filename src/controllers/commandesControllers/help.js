const Discord = require('discord.js')
const config = require('../../../config/config')
const middleWare = require('../../middleware/middlewares')

const generateEmbed = description => {
  return new Discord.RichEmbed()
    .setDescription(description)
    .setColor('#00a84c')
}

const sendMessage = async (message, messageArray, description) => {
  if (middleWare.argumentsCheck(message, messageArray, 1)) {
    await message.channel.send(generateEmbed(description))
  } else {

  }
}

module.exports = {
  async helpCommand (message, messageArray) {
    if (messageArray.length < 2) {
      const embed = new Discord.RichEmbed()
        .setColor('#00a84c')
        .setDescription(`voici mes différentes commandes\n si vous voulez plus d'informations sur une commande en particulier ajoutez le nom de la commmande après la commande help \n _**exemple**_ : !help${config.separator}annonce`)
        .addField('commande qui donne l\'heure : ', `${config.prefix}annonce`)

      await message.channel.send(embed)
    } else {
      switch (messageArray[1]) {
        case 'annonce' :
          await sendMessage(message, messageArray, `La commande annonce permet de programmer dans le temps un message qui sera posté dans le channel ${config.announcementChannel}, pour utiliser la commande voici sa construction : \`\`\` ${config.prefix}annonce${config.separator}AAAA/MM/JJ hh:mm${config.separator}Le super message que tu souhaite poster \`\`\` `)
          break
        case 'help' :
          await sendMessage(message, messageArray, 'en dev')
      }
    }
  }
}
