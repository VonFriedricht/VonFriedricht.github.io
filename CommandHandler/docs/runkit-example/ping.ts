const { CommandHandler, Command } = require("vnft-commandhandler");

const client = new CommandHandler();
client.prefix = "!";

const pingCommand = new Command();
pingCommand.name = "ping";
pingCommand.funct = (bot, message, args) => {
  message.reply("Pong!");
};

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
pingCommand.funct = (bot, message, args) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

client.addCommand(pingCommand);
client.addCommand(rick);

client.login("Discord Token");
