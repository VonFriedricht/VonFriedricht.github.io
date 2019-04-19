import { Client } from "discord.js";
import { Script } from "../classes/Script";

function test(bot: Client) {
  console.log(bot.users.find(u => u.username == "VonFriedricht").id);
}

module.exports = new Script(test, 1000 * 60 * 60);
