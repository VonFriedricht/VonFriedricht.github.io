import { Command } from "../Command";
import { Client, Message } from "discord.js";

function ping(bot: Client, message: Message, args: string) {
  message.reply("pong!");
}

module.exports = new Command("ping", ping, { dm: false });
