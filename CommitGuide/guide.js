const CommitGuide = require("./CommitGuide.js")

var client = new CommitGuide()

client.on("ready",function(){
  client.listen("./CommitGuide/commands/")
  client.admin= "397063436049186818"
})

client.login(process.env.beta)
