import { Command } from "vnftjs";
import { Guide } from "../classes/Guide";
import { Message } from "discord.js";

const commits = new Command();
commits.name = "commits";

commits.funct = async (bot: Guide, message: Message, args: string) => {
  // Message:  Current Day: day
  message.channel.send(`Current Day: ${bot.day}`);

  // Message:  Commits: Made / Required
  let made = await bot.fetchMadeCommits("VonFriedricht");
  let required = bot.requiredCommits;
  message.channel.send(`Commits: ${made} / ${required}`);

  // Message:  commits
  let wordcount = required - made;
  let wordgroups = await bot.nextWords(wordcount);
  let response = [];
  for (let wordgroup of wordgroups) {
    response.push(`\`${wordgroup.join("\n")}\``);
  }
  message.channel.send(response.join("\n\n"));
};

export = commits;
