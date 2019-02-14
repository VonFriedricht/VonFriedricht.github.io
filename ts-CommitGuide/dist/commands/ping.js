"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
module.exports = new Command_1.Command("ping", (bot, message, args) => {
    message.reply("pong!");
});
//# sourceMappingURL=ping.js.map