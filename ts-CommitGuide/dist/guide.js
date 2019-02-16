"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandler_1 = require("./CommandHandler");
var bot = new CommandHandler_1.CommandHandler();
bot.read_commanddir(__dirname + "/commands");
async function main() {
    let vnft = bot.users.find(u => u.id == "397063436049186818");
    bot.listen_user(vnft);
}
bot.login(process.env.beta).then(main);
