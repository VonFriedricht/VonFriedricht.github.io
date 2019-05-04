import { Message, Client } from "discord.js";
import { Command } from "vnft-commandhandler";

const ping = new Command();
ping.name = "ping";
ping.funct = function(bot: Client, message: Message, args: string) {
  message.channel.send("Pong!");
};

module.exports = ping;
