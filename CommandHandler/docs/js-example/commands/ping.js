const { Command } = require("vnft-commandhandler");

const pingCommand = new Command();
pingCommand.name = "ping";
pingCommand.funct = (bot, message, args) => {
  message.reply("Pong!");
};

module.exports = pingCommand;
