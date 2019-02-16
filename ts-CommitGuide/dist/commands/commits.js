"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
module.exports = [commits, hewwo, new Command_1.Command("nyeh", function (a, b, c) {
        b.reply(c);
    })];
function hewwo(bot, message, args) {
    message.reply(args);
}
function commits(bot, message, args) {
    message.reply(args);
}
