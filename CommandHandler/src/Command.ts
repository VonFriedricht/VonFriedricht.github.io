import { Client, Message, User } from "discord.js";

export type CommandFunction = (bot: Client, message: Message, args: string) => any;

export interface permissionlist {
  roles?: Object[],
  users?: Object[]
}

export class Command {
  _name: string;
  alias: string[];
  _funct: CommandFunction;
  type: string;

  whitelist: permissionlist | true; 
    // tbd roles and users that are allowed to use this command
    /*
      {
          roles: [
            {name: "Admin"},
            {id: "13212332453214"}
          ],
          users: [
            {username: "VonFriedricht", discriminator: "0000"},
            {id: "2134021709809874"}
          ]
       } 
       should get help with .whitelistUser()
                            .whitelistRole()
    */


  blacklist: permissionlist | false;
    // tbd roles and users that are not allowed to use this command

  constructor() {
    this.alias = [];
    this.type = "Command";

    this.whitelist = true;
    this.blacklist = false;
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

  isPermitted(author: User){
    if( this.whitelist === true && this.blacklist === false ) return true
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
