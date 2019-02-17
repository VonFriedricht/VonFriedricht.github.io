"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
let setActivity = new Command_1.Command("setActivity", function (bot, message, args) {
    bot.user.setActivity(args);
});
module.exports = setActivity;
