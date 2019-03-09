import { CommitGuide } from "../CommitGuide";
import { Message } from "discord.js";

async function next (bot: CommitGuide, message: Message, args: string) {
    let wordgroups = await bot.fetch_next_words_toString(Number(args))
    message.channel.send(wordgroups)
}

module.exports = new Command("next", next)
