const axios = require("axios")

module.exports = async (bot, message, args) => {
  var response = []
  var user = args || "VonFriedricht"
  
  var made_commits = await bot.get_made_commits("VonFriedricht")
  var required_commits = await bot.get_required_commits()
  response.push(`Commits: ${made_commits}/${required_commits}`)
  
  var wordcount = required_commits-made_commits
  var words = await bot.get_next_words(wordcount)
  response.push(words)
  
  message.channel.send(response.join("\n"))
}
