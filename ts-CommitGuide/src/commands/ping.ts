import { Command } from "../Command"
import { Client, Message } from "discord.js"

let ping = new Command ("ping", function (bot: Client, message: Message, args: string) {
    message.reply("pong!")
})

module.exports = ping 
