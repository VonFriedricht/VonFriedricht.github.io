import { Client, Message } from "discord.js";
import * as fs from "fs";
import { Command } from "./Command";
import { fetchJS } from "../tools/fetchJS";
import { Script } from "./Script";

export class CommandHandler extends Client {
  commands: Command[];
  scripts: any;

  constructor() {
    super();
    this.commands = [];
    let master = this;
    this.on("message", message => this.onMessage(message));
  }

  onMessage(message: Message) {
    let request = message.content.match(/\.(.*?)(\s|$)/);
    if (!request) return false;
    let commandName = request[1].toLowerCase();

    let command: Command = this.commands.find(c => c.name.toLowerCase() == commandName);
    if (command) {
      console.log(command.execute(this, message));
    }
  }

  loadCommands(target_path: string) {
    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path);
      for (let file of allJS) {
        let command = require(file);
        if (command.name && command.funct && command.funct.length == 3) {
          console.log(`loaded ${command.name}`);
          this.commands.push(command);
        }
      }
    }
  }

  loadScripts(target_path: string) {
    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path);
      for (let file of allJS) {
        console.log(file);
        let script : Script = require(file);
        if (script && script.type && script.type == "Script") {
          script.execute(this);
        }
      }
    }
  }
}
