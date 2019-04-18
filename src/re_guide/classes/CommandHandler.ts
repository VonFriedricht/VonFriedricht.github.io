import { Client, Message } from "discord.js";
import * as fs from "fs";
import { Command } from "./Command";
import { fetchJS } from "../tools/fetchJS";

export class CommandHandler extends Client {
  commands: any;
  scripts: any;

  constructor() {
    super();
    this.commands = [];
    let master = this;
    this.on("message", message => this.onMessage(master, message));
  }

  onMessage(bot: CommandHandler, message: Message) {
    let command = message.content.match(/\.(.*?)(\s|$)/);
    if (!command) return false;
    if (command[1] == "commits") {
      console.log(bot.commands)
      console.log(this.commands)
    }
  }

  loadCommands(target_path: string) {
    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path)
      for(let file of allJS){
        let command = require(file)
        if(command.name && command.funct && command.funct.length == 3){
          console.log(`loaded ${command.name}`)
          this.commands.push(command)
        }
      }
    }
  }

  loadScripts(target_path: string) {
    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      this.scripts = fetchJS(target_path);
    }
  }
}
