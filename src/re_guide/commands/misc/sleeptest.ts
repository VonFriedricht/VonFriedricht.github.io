import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";
import { sleep } from "vnft-tools";

const sleeptest = new Command();
sleeptest.name = "st";

sleeptest.funct = async (bot: Client, message: Message, args: string) => {
  message.reply(1);
  await sleep(1000);
  message.reply(2);
};

module.exports = sleeptest;
