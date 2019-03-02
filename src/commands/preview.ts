module.exports = async (bot, message, args) => {
    let weekdays = ["","","","","","",""]
    bot.target_image.forEach((v,i)=>{
        let e = bot.preview_tiles[v-1]
        weekdays[i%7] += e+e
    })
    message.channel.send(weekdays.join("\n"))
}
