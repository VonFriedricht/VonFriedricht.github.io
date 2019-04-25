import { Command } from "vnft-commandhandler";
import { Client, Message, PresenceStatus } from "discord.js";

const Presences: PresenceStatus[] = ["online", "idle", "dnd", "invisible"];

const translations = {
  green: "online",
  yellow: "idle",
  red: "dnd",
  gray: "invisible"
};

const setStatus = new Command();
setStatus.name = "setStatus";
setStatus.funct = function(bot: Client, message: Message, args: string) {
  args = args.toLowerCase();
  args = translations[args] || args;
  let presence = Presences.find(p => p == args);
  if (presence) {
    bot.user.setStatus(presence);
  }
};

module.exports = setStatus;
