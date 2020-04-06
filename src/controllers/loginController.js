const loginToken = process.env.LOGIN_TOKEN

module.exports = {
  async loginBot (bot) {
    await bot.login(loginToken)
  }
}