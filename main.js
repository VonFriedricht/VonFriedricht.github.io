Discord = require("discord.js")
const bot = new Discord.Client()

const ADMIN = process.env.admin
const DESTINY_TOKEN = process.env.destiny

bot.on("ready",async function(){
    bot.admin = bot.users.find(user=>user.id==ADMIN
    console.log("My Body is Ready!")
})

bot.login(DESTINY_TOKEN)
