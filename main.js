const { CommandHandler } = require('vnftjs')
const path = require('path')

const bot = new CommandHandler()

bot.prefix = '.'

bot.loadCommands(path.join(__dirname, 'commands'))

bot.login(process.env.discord_token)
