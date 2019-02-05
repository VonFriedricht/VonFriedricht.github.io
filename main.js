const Discord = require("discord.js")
const bot = new Discord.Client()

const CommitGuide = require("./CommitGuide.js")
const commitguide = new CommitGuide(bot, {
    top_left_day: process.env.top_left_day,
    target_image: process.env.commit_image,
    lyrics: process.env.lyrics.split(" "),
    admin: process.env.admin
})

bot.on("ready",async function(){
    console.log("My Body is Ready!")
})

bot.login(process.env.destiny)
