import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";

const activity = new Command();
activity.name = "setActivity";
activity.addAlias("activity");

activity.funct = async (bot: Client, message: Message, args: string) => {
  await bot.user.setActivity(args);
  message.reply(`Activity Updated!`);
};

activity.addUserWhitelist( u => u.id == "397063436049186818" );

module.exports = activity;
