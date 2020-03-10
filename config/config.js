require('colors')

module.exports = {
  prefix: '!',
  separator: ';',
  announcementChannel: 'annonces',
  console: {
    error: 'ERROR'.bgRed,
    info: 'INFO'.bgBlue,
    warn: 'WARNING'.bgYellow
  }
}
