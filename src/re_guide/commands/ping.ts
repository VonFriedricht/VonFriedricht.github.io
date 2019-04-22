import { Message, Client } from "discord.js";
import { Guide } from "../classes/Guide";
import { Command } from "../classes/Command";

const ping = new Command();
ping.name = "ping";
ping.funct = function(bot: Client, message: Message, args: string) {
  message.channel.send("Pong!");
};

module.exports = ping;
