"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommitGuide_1 = require("./CommitGuide");
var bot = new CommitGuide_1.CommitGuide();
async function exec() {
    await bot.login(process.env.beta);
    let vnft = bot.users.find(u => u.id == "397063436049186818");
    bot.listen_user(vnft);
    bot.read_commanddir(__dirname + "/commands");
}
exec();
//# sourceMappingURL=guide.js.map