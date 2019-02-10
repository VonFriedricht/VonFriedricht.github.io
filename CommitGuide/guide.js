const CommitGuide = require("./CommitGuide.js")

var client = new CommitGuide()
client.on("ready",function(){
    console.log(this)
    client.admin = "397063436049186818"
    
    client.listen("./CommitGuide/commands/")
})

client.login(process.env.beta)
