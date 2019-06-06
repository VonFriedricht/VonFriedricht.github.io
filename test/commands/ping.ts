import { Command } from "vnftjs";

const ping = new Command();
ping.name = "ping";

ping.funct = (client, message, args) => {
  message.reply("pong!");
};

ping.addUserWhitelist(u => u.id == "397063436049186818");

module.exports = ping;
