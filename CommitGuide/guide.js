const CommitGuide = require("./CommitGuide.js")

var client = new CommitGuide({
  top_left_day: process.env.top_left_day,
  target_image: process.env.commit_image,
  lyrics: process.env.lyrics.split("+")
})

client.on("ready",function(){
  client.listen("./CommitGuide/commands/")
  client.admin="397063436049186818"
  client.admin.send("nyeh!")
})

client.login(process.env.beta)
