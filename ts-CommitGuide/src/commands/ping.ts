import { Command } from "../Command"

module.exports = new Command("ping", (bot, message, args) => {
    message.reply("pong!")
})