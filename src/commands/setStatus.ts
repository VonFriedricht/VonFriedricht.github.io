import { Command } from "../Command";
import { Client, Message, PresenceStatus } from "discord.js";

type AdvancedPresenceStatus =
  | PresenceStatus
  | "red"
  | "green"
  | "yellow"
  | "grey";
let Presences: PresenceStatus[] = ["online", "dnd", "idle", "invisible"];
let PresencesString: string[] = ["online", "dnd", "idle", "invisible"];

let setStatus = new Command("setStatus", function(
  bot: Client,
  message: Message,
  args: string
) {
  if (isFinite(Number(args))) {
    var index = Number(status);
    bot.user.setStatus(Presences[index]);
  } else {
    let p_index = PresencesString.indexOf(args);
    if (p_index != -1) {
      bot.user.setStatus(Presences[p_index]);
    }
  }
});

module.exports = setStatus;
