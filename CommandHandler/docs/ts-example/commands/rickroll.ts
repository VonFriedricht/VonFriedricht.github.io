import { Command } from "../../../src";
import { Client, Message } from "discord.js";

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
rick.funct = (bot: Client, message: Message, args: string) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

module.exports = rick;
