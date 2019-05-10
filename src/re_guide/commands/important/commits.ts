import { Command } from "vnft-commandhandler/lib/src";
import { Guide } from "re_guide/classes/Guide";

const commits = new Command();
commits.name = "commits";

commits.funct = async (bot:Guide, message, args) => {
    message.channel.send(`Current Day: ${bot.day}`);
    
    let made = await bot.fetchMadeCommits("VonFriedricht")
    let required = bot.requiredCommits
    message.channel.send(`Commits: ${made} / ${required}`)

    let wordcount = required - made;
    let wordgroups = await bot.nextWords(wordcount);
    message.channel.send(wordgroups.join("\n"));
};

module.exports = commits;
