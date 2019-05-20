import { Command } from "vnftjs";
import { Guide } from "classes/Guide";
import { Message } from "discord.js";

const next = new Command();
next.name = "next";

next.funct = async (bot: Guide, message: Message, args: string = "5"): Promise<void> => {
  // Message:  commits
  let wordcount = Number(args);
  let wordgroups = await bot.nextWords(wordcount);
  let response = [];
  for (let wordgroup of wordgroups) {
    response.push(`\`${wordgroup.join("\n")}\``);
  }
  message.channel.send(response.join("\n"));
};

module.exports = next;
