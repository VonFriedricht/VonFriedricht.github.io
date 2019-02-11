const axios = require("axios")

module.exports = async (bot, message, args) => {
  var response = []
  var user = args || "VonFriedricht"
  
  var made_commits = await bot.get_made_commits("VonFriedricht")
  var required_commits = await bot.get_required_commits()
  
  message.channel.send(`${made_commits}/${required_commits}`)
  require("./next")(bot, message, required_commits-made_commits)
}
