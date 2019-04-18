import { Client, Message } from "discord.js";

export function command(bot: Client, message: Message, args: string): void {
  message.channel.send("pong!");
}
