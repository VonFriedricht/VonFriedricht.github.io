"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
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
            list = list.filter(file => file.match(/.js$/g));
            list.forEach(file => {
                guide.add_command(require(dir + "/" + file));
            });
            console.log(guide.commands);
        });
    }
    /*execute_command(name: string, message: Message, args: string){
        let target_command =
    }*/
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
        var command = message.content.split(" ")[0];
        var args = message.content.split(" ").slice(1).join(" ");
        if (!command.startsWith(this.prefix)) {
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