import { Client, Message } from "discord.js";

type CommandFunction = (bot: Client, message: Message, args: string) => any;

export class Command {
  _name: string;
  _funct: CommandFunction;
  type: string;

  constructor(name?: string, funct?: CommandFunction) {
    this.name = name;
    this.funct = funct;
    this.type = "Command"
  }

  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }

  set funct(funct: CommandFunction) {
    this._funct = funct;
  }
  get funct(): CommandFunction {
    return this._funct;
  }

  execute(bot: Client, message: Message) {
    let params = message.content.match(/.*?\s(.*$)/);
    let args: string = params ? params[1] : "";
    this.funct(bot, message, args);
  }
}
