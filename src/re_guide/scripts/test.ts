import { Client } from "discord.js";
import { Script } from "../classes/Script";

function test(bot: Client) {
  console.log("test");
}

module.exports = new Script(test, 1000 * 60 * 60);
