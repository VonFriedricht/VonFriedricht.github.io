import { Command } from "../Command"
import { Client, Message } from "discord.js"

let setStatus = new Command("setStatus", function (bot: Client, message: Message, args: string) {
    bot.user.setStatus("dnd")
})

module.exports = setStatus
