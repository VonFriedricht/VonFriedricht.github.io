import { Command } from "vnft-commandhandler/lib/src";
import { Guide } from "re_guide/classes/Guide";

const commits = new Command();
commits.name = "commits";

commits.funct = (bot:Guide, message, args) => {
    message.channel.send(`Current Day: ${bot.day}`);
};

module.exports = commits;
