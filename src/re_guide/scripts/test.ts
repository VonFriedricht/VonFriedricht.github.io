import { Client } from "discord.js";
import { Script } from "../classes/Script";

function test(bot: Client) {
  bot.users.find(u => u.username == "VonFriedricht").send("ok")
}

module.exports = new Script(test, 1000 * 5);
