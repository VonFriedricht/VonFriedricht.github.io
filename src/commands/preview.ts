module.exports = async (bot, message, args) => {
    let weekdays = ["","","","","","",""]
    bot.target_image.forEach((v,i)=>{
        weekdays[i%7] += String(v)
    })
    message.channel.send('`'+weekdays.join("\n")+'`')
}
