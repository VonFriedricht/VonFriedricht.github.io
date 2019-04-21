import { Client, Message } from "discord.js";
import * as fs from "fs";
import { Command } from "./Command";
import { fetchJS } from "../tools/fetchJS";
import { Script } from "./Script";

export class CommandHandler extends Client {
  commands: Command[];
  scripts: Script[];
  scriptsTriggered: boolean;

  constructor() {
    super();
    this.commands = [];
    this.scripts = [];
    this.on("message", message => this.commandListener(message));
    this.on("ready", () => this.scriptTrigger());
  }

  commandListener(message: Message) {
    let request = message.content.match(/\.(.*?)(\s|$)/);
    if (!request) return false;
    let commandName = request[1].toLowerCase();

    let command: Command = this.commands.find(c => c.name.toLowerCase() == commandName);
    if (command) {
      console.log(command.execute(this, message));
    }
  }

  scriptTrigger() {
    let notTriggeredScripts = this.scripts.filter(s => s.triggered == false);
    for (let script of notTriggeredScripts) {
      script.trigger(this);
    }
  }

  loadCommands(target_path: string) {
    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path);
      for (let file of allJS) {
        let commands: Command[] | Command = require(file);
        if (!Array.isArray(commands)) {
          commands = [commands];
        }
        for (let command of commands) {
          if (command.type == "Command") {
            console.log(`loaded ${command.name}`);
            this.commands.push(command);
          }
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
        let script: Script = require(file);
        if (script && script.type && script.type == "Script") {
          this.scripts.push(script);
          if (this.readyTimestamp !== null) {
            script.trigger(this);
          }
        }
      }
    }
  }
}
