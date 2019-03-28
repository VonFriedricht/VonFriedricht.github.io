import { CommitGuide } from "../CommitGuide";
import { Message } from "discord.js";

function say(bot: CommitGuide, message: Message, args: string) {
  message.channel.send(args);
}

function sayd(bot: CommitGuide, message: Message, args: string) {
  message.channel.send(args);
  message.delete();
}

module.exports = [say, sayd];
