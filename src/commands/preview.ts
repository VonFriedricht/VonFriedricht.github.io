import { Message } from "discord.js"
import { CommitGuide } from "../CommitGuide";
import { Command } from "../Command";

async function preview(bot: CommitGuide, message: Message, args: string) {
    let weekdays = ["","","","","","",""]
    bot.target_image.forEach((v,i)=>{
        let e = bot.preview_tiles[v-1]
        weekdays[i%7] += e+e
    })
    message.channel.send(weekdays.join("\n"))
}

module.exports = new Command("preview", preview)
