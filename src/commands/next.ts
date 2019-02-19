module.exports = async (bot, message, args) => {
    let wordgroups = await bot.fetch_next_words_toString(args)
    message.channel.send(wordgroups)
}
