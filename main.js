Discord = require("discord.js")
const bot = new Discord.Client()

const ADMIN = process.env.admin
const DESTINY_TOKEN = process.env.destiny
const TOP_LEFT_DAY = process.env.top_left_day
const COMMIT_IMAGE = process.env.commit_image
const LYRICS = process.env.lyrics

bot.on("ready",async function(){
    bot.admin = bot.users.find(user=>user.id==ADMIN
    console.log("My Body is Ready!")
    commitguide_init(bot)
})

bot.login(DESTINY_TOKEN)

function commitguide_init(bot){
    bot.commitguide = {
        preview_tiles: "─░▓█",
        top_left_day: TOP_LEFT_DAY,
        target_text: COMMIT_IMAGE,
        lyrics: LYRICS,
        sizes: [0,1,5,10]
    }
    bot.commitguide.get_current_date = () => {
        var current_time_ms = new Date().getTime()-new Date(top_left_day).getTime()
        var current_time_day = current_time_ms/1000/60/60/24
        return Math.floor(current_time_day)
    }
    bot.commitguide.get_current_tile = () => {
        return target_text[this.get_current_day()]
    }
    bot.commitguide.get_preview = () => {
        var result = new Array(7).fill("")
        for( var i in bot.commitguide.target_text ){
            var tile = bot.commitguide.preview_tiles[bot.commitguide.target_text[i]-1]
            result[(i%7)] += tile+tile
        }
        return result.join("\n")
    }
    bot.commitguide.on_message = (message) => {
        if( message.content == "test" ){
            message.reply(bot.commitguide.preview_tiles)
        }
        if( message.content == ".show preview" ){
            message.channel.send(bot.commitguide.get_preview())
        }
    }

    bot.on("message",bot.commitguide.on_message)
}
