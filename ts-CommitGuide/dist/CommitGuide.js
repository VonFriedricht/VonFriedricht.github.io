"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("./Command");
const fs_1 = require("fs");
class CommitGuide extends discord_js_1.Client {
    constructor() {
        super();
        this.prefix = ".";
        this.commands = [];
    }
    add_command(command) {
        this.commands.push(command);
    }
    read_commanddir(dir) {
        var guide = this;
        fs_1.readdir(dir, function (error, list) {
            console.log(list);
            list = list.filter(file => file.match(/\.js$/g));
            list.forEach(filename => {
                var file = require(dir + "/" + filename);
                if (typeof file == "function" && file.length == 3) {
                    let commandname = filename.match(/(.*?)\.js$/)[1];
                    guide.add_command(new Command_1.Command(commandname, file));
                }
                if (file instanceof Command_1.Command) {
                    guide.add_command(file);
                }
                if (Array.isArray(file) && file[0] instanceof Command_1.Command) {
                    file.forEach(c => guide.add_command(c));
                }
            });
            console.log(guide.commands);
        });
    }
    listen_user(user) {
        this.on("message", (message) => {
            if (message.author == user) {
                console.log(this.commands);
                this.handle_command(message);
            }
        });
    }
    listen_channel(channel) {
        this.on("message", (message) => {
            if (message.channel == channel) {
                console.log(this.commands);
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
exports.CommitGuide = CommitGuide;
//# sourceMappingURL=CommitGuide.js.map