import { Command } from "../Command"
import { Message } from "discord.js"
import { CommitGuide } from "../CommitGuide";

let commits_name = "commits"

async function commits_func(bot: CommitGuide, message: Message, args: string) {
    let response = []
    let user = args || "VonFriedricht"

    let made_commits = await bot.fetch_made_commits(user)
    let required_commits = bot.required_commits
    response.push(`Commits: ${made_commits}/${required_commits}\n`)

    let wordcount = required_commits-made_commits
    let wordgroups = await bot.fetch_next_words_toString(wordcount)
    response.push(wordgroups)

    message.channel.send(response.join("\n"))
}

module.exports = new Command(commits_name, commits_func)
