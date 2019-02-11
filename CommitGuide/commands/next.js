module.exports = async (bot, message, args) => {
  message.reply(await bot.get_next_words(args))
}
