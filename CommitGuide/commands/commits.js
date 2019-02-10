const axios = require("axios")

module.exports = async (bot, message, args) => {
  var response = []
  var user = args || "VonFriedricht"
  
  // date: format YYYY-MM-DD
  var date = new Date().toISOString().split("T")[0]
  
  // getting github page
  var site = await axios.get(`https://github.com/${user}`)
  var sitecontent = site.data
  
  // regular expression to find the data-count for the given date
  var target_reg = new RegExp(`data-count="(.*?)" data-date="${date}"`,"g")
  
  var r = target_reg.exec(sitecontent)
  var todays_commits = await bot.get_todays_commits()
  
  response.push(`todays commits: ${+r[1]}/${todays_commits}`)
  
  // check-value, to make sure everything is allright
  response.push(`(${r[0]})`)
  
  message.channel.send(response.join("\n"))
}
