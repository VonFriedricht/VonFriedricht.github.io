import { Command } from "../Command"

module.exports = new Command("setActivity", (bot, message, args) => {
    bot.user.setActivity(args)
})