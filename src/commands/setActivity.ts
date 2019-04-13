import { Command } from "../Command";
import { Client, Message } from "discord.js";

function setActivity(bot: Client, message: Message, args: string) {
  bot.user.setActivity(args);
}

module.exports = new Command("setActivity", setActivity);
