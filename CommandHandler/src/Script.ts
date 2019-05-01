import { Client } from "discord.js";

export type ScriptFunction = (bot: Client) => any;

export class Script {
  funct: ScriptFunction;
  intervalTime: number;
  interval: NodeJS.Timeout;
  type: String;
  triggered: boolean;

  constructor(funct: ScriptFunction, interval: number = -1) {
    this.funct = funct;
    this.intervalTime = interval;
    this.type = "Script";
    this.triggered = false;
  }

  trigger(bot: Client) {
    if (this.triggered == false) {
      this.funct(bot);
      if (this.intervalTime >= 0) {
        this.interval = setInterval(this.funct, this.intervalTime, bot);
      }
      this.triggered = true;
    }
  }
}
