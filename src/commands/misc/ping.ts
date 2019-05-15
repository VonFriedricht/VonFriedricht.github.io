import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const ping = new Command();
ping.name = "ping";

ping.funct = (bot: Client, message: Message, args: string) => {
  message.reply("Pong!");
};

module.exports = ping;
