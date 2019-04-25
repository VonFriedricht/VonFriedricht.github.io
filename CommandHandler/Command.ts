import { Client, Message } from "discord.js";

export type commandFunction = (bot: Client, message: Message, args: string) => void;

export class Command {
  _name: string;
  _funct: commandFunction;

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set funct(funct) {
    this._funct = funct;
  }
  get funct() {
    return this._funct;
  }

  execute(bot: Client, message: Message) {
    if (this.name && this.funct) {
      let args = message.content
        .split(" ")
        .splice(1)
        .join(" ");
      this.funct(bot, message, args);
    }
  }
}
