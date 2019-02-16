import { Client, Message } from "discord.js";
import { Command } from "../Command";

module.exports = [commits, hewwo, new Command("nyeh", function(a,b,c){
    b.reply(c)
})]

function hewwo (bot: Client, message: Message, args: string) {
    message.reply(args)
}

function commits (bot: Client, message: Message, args: string) {
    message.reply(args)
}