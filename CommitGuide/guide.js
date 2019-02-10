const CommitGuide = require("./CommitGuide.js")

var client = new CommitGuide({
  admin: "397063436049186818"
})

client.on("ready",function(){
    client.listen("./CommitGuide/commands/")
})

client.login(process.env.beta)
