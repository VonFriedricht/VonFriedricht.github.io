module.exports = async (bot, message, args) => {
  message.channel.send(await bot.get_next_words(args))
}
