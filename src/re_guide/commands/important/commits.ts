import { Guide } from "../../classes/Guide";
import { Message } from "discord.js";

export function command(bot: Guide, message: Message, args: string){
    message.channel.send("Hi!")
}