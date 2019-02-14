"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
module.exports = new Command_1.Command("setActivity", (bot, message, args) => {
    bot.user.setActivity(args);
});
//# sourceMappingURL=setactivity.js.map