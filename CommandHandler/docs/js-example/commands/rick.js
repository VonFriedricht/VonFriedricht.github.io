const { Command } = require("vnft-commandhandler");

const rick = new Command();
rick.name = "rick";
rick.addAlias("roll");
rick.funct = (bot, message, args) => {
  message.reply("https://youtu.be/dQw4w9WgXcQ");
};

module.exports = rick;
