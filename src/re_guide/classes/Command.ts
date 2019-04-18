import { Client, Message } from "discord.js";

type CommandFunction = (bot: Client, message: Message, args: string) => any;

export class Command {
  _name: String;
  _funct: CommandFunction;

  constructor() {}

  set name(name: String) {
    this._name = name;
  }
  get name(): String {
    return this._name;
  }

  set funct(funct: CommandFunction) {
    this._funct = funct;
  }
  get funct(): CommandFunction {
    return this._funct;
  }

  execute(bot: Client, message: Message, args: String) {}
}
