import { Command } from "../classes/Command";
import { Client, Message } from "discord.js";

const setActivity = new Command();
setActivity.name = "setActivity";
setActivity.funct = function(bot: Client, message: Message, args: string) {
  bot.user.setActivity(args);
};

module.exports = [setActivity];
