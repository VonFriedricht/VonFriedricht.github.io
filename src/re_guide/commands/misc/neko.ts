import { Command } from "vnft-commandhandler";
import { Client, Message } from "discord.js";
import axios from "axios";

const neko = new Command();
neko.name = "neko";
neko.addAlias("cat");

neko.funct = async (bot: Client, message: Message, args: string) => {
  let meow = await axios.get("http://aws.random.cat/meow");
  message.reply(meow.data.file);
};

module.exports = neko;
