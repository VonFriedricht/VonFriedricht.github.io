import { Client, Message } from "discord.js";
import * as fs from "fs";
import { fetchJS } from "vnft-tools";

export class CommandHandler extends Client {
  commands: Command[];
  scripts: Script[];
  scriptsTriggered: boolean;
  prefix: string;

  constructor() {
    super();
    this.commands = [];
    this.scripts = [];
    this.prefix = ".";
    this.on("message", message => this.commandListener(message));
    this.on("ready", () => this.scriptTrigger());
  }

  commandListener(message: Message) {
    let regexPrefix = this.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    let requestReg = new RegExp(`^${regexPrefix}(.*?)(\\s|$)`);

    let request = message.content.match(requestReg);
    if (!request) return false;
    let commandName = request[1].toLowerCase();

    let command: Command = this.commands.find(c => {
      let inAlias = c.alias.map(s => s.toLowerCase()).includes(commandName);
      let isName = c.name.toLowerCase() == commandName;
      return inAlias || isName;
    });
    if (command) {
      command.execute(this, message);
    }
  }

  addCommand(command: Command) {
    console.log(`loaded ${command.name}`);
    this.commands.push(command);
  }

  addScript(script: Script) {
    this.scripts.push(script);
    if (this.readyTimestamp !== null) {
      script.trigger(this);
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
        let commands: Command | Command[] = require(file);
        if (!Array.isArray(commands)) {
          commands = [commands];
        }
        for (let command of commands) {
          if (command.type == "Command") {
            this.addCommand(command);
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
        let scripts: Script | Script[] = require(file);
        if (!Array.isArray(scripts)) {
          scripts = [scripts];
        }
        for (let script of scripts) {
          if (script.type == "Script") {
            this.addScript(script);
          }
        }
      }
    }
  }
}

type CommandFunction = (bot: Client, message: Message, args: string) => any;

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
