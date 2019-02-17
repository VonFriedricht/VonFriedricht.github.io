"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
let ping = new Command_1.Command("ping", function (bot, message, args) {
    message.reply("pong!");
});
module.exports = ping;
