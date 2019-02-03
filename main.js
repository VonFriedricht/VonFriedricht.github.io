const Discord = require("discord.js")
const bot = new Discord.Client()

const CommitGuide = require("./CommitGuide.js")
const commitguide = new CommitGuide(bot, {
    top_left_day: TOP_LEFT_DAY,
    target_image: COMMIT_IMAGE,
    lyrics: LYRICS
})

const ADMIN = process.env.admin
const TOP_LEFT_DAY = process.env.top_left_day
const COMMIT_IMAGE = process.env.commit_image
const LYRICS = process.env.lyrics
const DESTINY_TOKEN = process.env.destiny

bot.on("ready",async function(){
    bot.admin = bot.users.find(user=>user.id==ADMIN)
    console.log("My Body is Ready!")
})

bot.login(DESTINY_TOKEN)
