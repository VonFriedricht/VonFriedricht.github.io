const axios = require("axios")

module.exports = async (bot, message, args = "VonFriedricht") => {
  var response = []
  var user = args
  
  // date: format YYYY-MM-DD
  var date = new Date().toISOString().split("T")[0]
  
  // github page of VonFriedricht
  var site = await axios.get(`https://github.com/${user}`)
  var sitecontent = site.data
  
  // regular expression to find the data-count for the given date
  var target_reg = new RegExp(`data-count="(.*?)" data-date="${date}"`,"g")
  var todays_commits = bot.guide.todays_commits
  var r = target_reg.exec(site)
  response.push(`todays commits: ${+r[1]}/${todays_commits}`)
  
  // check-value, to make sure everything is allright
  response.push(`(${r[0]})`)
  
  message.channel.send(response.join("\n"))
}
