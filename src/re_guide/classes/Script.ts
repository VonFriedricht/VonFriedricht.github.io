import { Client } from "discord.js";

export class Script {
  funct: (bot: Client) => any;
  interval: number;
  type: String;

  constructor(funct, interval) {
    this.funct = funct;
    this.interval = interval;
    this.type = "Script";
  }

  execute(bot: Client) {
    setInterval(this.funct, this.interval, bot);
  }
}
