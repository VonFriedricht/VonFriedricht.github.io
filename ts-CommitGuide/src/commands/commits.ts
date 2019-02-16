import { Client, Message } from "discord.js";

module.exports = (bot: Client, message: Message, args: string) => {
    message.reply(args)
}