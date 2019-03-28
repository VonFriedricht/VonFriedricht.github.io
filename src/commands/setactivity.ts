import { Command } from "../Command";
import { Client, Message } from "discord.js";

let setActivity = new Command("setActivity", function(
  bot: Client,
  message: Message,
  args: string
) {
  bot.user.setActivity(args);
});

module.exports = setActivity;
