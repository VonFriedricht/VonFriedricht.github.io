"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("./Command");
const fs_1 = require("fs");
class CommandHandler extends discord_js_1.Client {
    constructor() {
        super();
        this.prefix = ".";
        this.commands = [];
        this.allowed_commandnames = /^[A-Za-z0-9_-]+$/;
    }
    add_command(command) {
        if (command.name.match(this.allowed_commandnames)) {
            this.commands.push(command);
        }
        else {
            console.log(`Command "${this.prefix}${command.name}" not added because it does not fit ${this.allowed_commandnames}`);
        }
    }
    read_commanddir(dir) {
        var guide = this;
        fs_1.readdir(dir, function (error, list) {
            let jsfiles = list.filter(file => file.match(/\.js$/g));
            for (let filename of jsfiles) {
                var file = require(dir + "/" + filename);
                //  if an command has been exported
                if (file instanceof Command_1.Command) {
                    guide.add_command(file);
                }
                //  if an valid function has been exported
                if (typeof file == "function" && file.length == 3) {
                    let commandname = filename.match(/(.*?)\.js$/)[1];
                    guide.add_command(new Command_1.Command(commandname, file));
                }
                //  if an array has been exported
                if (Array.isArray(file)) {
                    let target_commands;
                    //  for every command in the exported array
                    target_commands = file.filter(c => c instanceof Command_1.Command);
                    for (let c of target_commands) {
                        guide.add_command(c);
                    }
                    //  for every valid function that can be interpreted as an command
                    target_commands = file.filter(c => typeof c == "function" && c.length == 3 && c.name != "");
                    for (let c of target_commands) {
                        guide.add_command(new Command_1.Command(c.name, c));
                    }
                }
            }
        });
    }
    listen_user(user) {
        this.on("message", (message) => {
            if (message.author == user) {
                this.handle_command(message);
            }
        });
    }
    listen_channel(channel) {
        this.on("message", (message) => {
            if (message.channel == channel) {
                this.handle_command(message);
            }
        });
    }
    handle_command(message) {
        var command = message.content.split(" ")[0].toLowerCase();
        var args = message.content.split(" ").slice(1).join(" ");
        if (!command.startsWith(this.prefix.toLowerCase())) {
            return false;
        }
        command = command.substr(this.prefix.length);
        let target_command = this.commands.find(c => c.name == command);
        if (target_command) {
            target_command.execute(this, message, args);
        }
    }
}
exports.CommandHandler = CommandHandler;
