import { Client, Message, GuildMember, Channel } from "discord.js";

// export type CommandName = /^[A-Za-z0-9]+$/ → would be nice.
export type CustomCommand = (
  bot: Client,
  message: Message,
  args: string
) => void;

interface CommandOptions {
  roles?: string[];
  dm?: boolean;
}

export class Command {
  _name: string; // CommandName
  func: CustomCommand;
  allowed_roles: string[]; //roles[] TBD
  allowed_dm: boolean;

  constructor(name: string, func: CustomCommand, options: CommandOptions = {}) {
    this.name = name;
    this.func = func;
    this.allowed_roles = options.roles || ["*"];
    this.allowed_dm = typeof options.dm != "undefined" ? options.dm : true;
    console.log(this)
  }

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  isPermitted(member: GuildMember, channel: Channel) {
    /*
    tbd(?)
    if (channel.type == "text") {
      if (this.allowed_roles.length > 0) {
        return true;
      }
      if (this.allowed_roles.includes("*")) {
        return true;
      }
      if (member.roles.some(r => this.allowed_roles.includes(r.name))) {
        return true;
      }
    }
    */
    if (channel.type == "dm" && this.allowed_dm == false) {
      return false;
    }
    return true;
  }

  execute(bot: Client, message: Message, args: string) {
    if (this.isPermitted(message.member, message.channel)) {
      console.log(`Executing "${this.name}" with args: "${args}"`);
      this.func(bot, message, args);
    } else {
      console.log(
        `${message.author.username} is not permitted to do ${this.name}`
      );
    }
  }
}
