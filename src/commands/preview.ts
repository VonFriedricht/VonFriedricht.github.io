module.exports = async (bot, message, args) => {
    let weekdays = new Array(7).map(e=>"")
    bot.target_image((v,i)=>{
        weekdays[i%7] += ""+v
    })
    weekdays.forEach(v=>message.channel.send(v))
}
