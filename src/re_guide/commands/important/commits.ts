import { Guide } from "../../classes/Guide";
import { Message } from "discord.js";
import { Command } from "../../classes/Command";

function commits (bot: Guide, message: Message, args: string){
    message.channel.send("Hi!")
}

module.exports = new Command("commits", commits)
