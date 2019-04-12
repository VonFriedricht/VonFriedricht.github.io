import { Command } from "../Command";
import { Client, Message } from "discord.js";

function ping(bot: Client, message: Message, args: string) {
  message.reply("pong!");
}

let options = {
  dm: false
}

module.exports = new Command("ping", ping, options);
