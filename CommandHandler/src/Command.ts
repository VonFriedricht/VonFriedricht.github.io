import { Client, Message } from "discord.js";

export type CommandFunction = (bot: Client, message: Message, args: string) => any;

export class Command {
  _name: string;
  alias: string[];
  _funct: CommandFunction;
  type: string;

  constructor() {
    this.alias = [];
    this.type = "Command";
  }

  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }

  addAlias(name: string) {
    this.alias.push(name);
  }

  set funct(funct: CommandFunction) {
    this._funct = funct;
  }
  get funct(): CommandFunction {
    return this._funct;
  }

  execute(bot: Client, message: Message) {
    if (this.funct) {
      console.log(`Executing: `, this);
      let params = message.content.match(/.*?\s(.*$)/);
      let args: string = params ? params[1] : "";
      this.funct(bot, message, args);
    } else {
      console.log(`Can't Execute ${this.name}, because it hasn't funct set.`);
    }
  }
}
