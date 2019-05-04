const { CommandHandler } = require("vnft-commandhandler");
const path = require("path");

const client = new CommandHandler();
client.prefix = "!";

client.loadCommands(path.join(__dirname, "commands"));

client.login("Discord Token");
