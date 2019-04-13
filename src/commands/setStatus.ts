import { Command } from "../Command";
import { Client, Message, PresenceStatus } from "discord.js";

let Presences: PresenceStatus[] = ["online", "dnd", "idle", "invisible"];
let PresencesString: string[] = ["online", "dnd", "idle", "invisible"];

function setStatus(bot: Client, message: Message, args: string) {
  if (isFinite(Number(args))) {
    var index = Number(status);
    bot.user.setStatus(Presences[index]);
  } else {
    let p_index = PresencesString.indexOf(args);
    if (p_index != -1) {
      bot.user.setStatus(Presences[p_index]);
    }
  }
}

module.exports = new Command("setStatus", setStatus);
