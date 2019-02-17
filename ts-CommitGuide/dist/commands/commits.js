"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../Command");
let commits_name = "ts-commits";
async function commits_func(bot, message, args) {
    let response = [];
    let user = args || "VonFriedricht";
    let made_commits = await bot.fetch_made_commits(user);
    let required_commits = bot.required_commits;
    response.push(`Commits: ${made_commits}/${required_commits}\n`);
    let wordcount = required_commits - made_commits;
    let wordgroups = await bot.fetch_next_words_toString(wordcount);
    response.push(wordgroups);
    message.channel.send(response.join("\n"));
}
module.exports = new Command_1.Command(commits_name, commits_func);
