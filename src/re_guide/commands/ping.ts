import { Message } from "discord.js";
import { Guide } from "../classes/Guide";
import { Command } from "../classes/Command";

function ping(bot: Guide, message: Message, args: string){
  message.channel.send("Pong!");
}

module.exports = new Command("ping", ping)
