import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const say = new Command()
say.name = "say"
say.funct = (bot: Client, message: Message, args: string) => {
    message.channel.send(args)
}

const sayd = new Command()
sayd.name = "say"
sayd.funct = (bot: Client, message: Message, args: string) => {
    message.channel.send(args)
    message.delete()
}

module.exports = [say,sayd];
