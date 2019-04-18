import { Client } from "discord.js";
import * as fs from "fs";
import { Command } from "./Command";
import { fetchJS } from "../tools/fetchJS";

export class CommandHandler extends Client {
  commands: Command[];

  constructor() {
    super();
    this.commands = [];
  }

  loadCommands(target_path: string) {
    console.log(target_path);

    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path);
      console.log(allJS);
    }
  }

  loadScripts(target_path: string) {
    console.log(target_path);

    let exists = fs.existsSync(target_path);
    if (!exists) return false;

    let isDir = fs.statSync(target_path).isDirectory();
    if (isDir) {
      let allJS = fetchJS(target_path);
      console.log(allJS);
    }
  }
}
