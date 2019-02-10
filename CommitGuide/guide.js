const GuideClient = require("./GuideClient.js")

var client = new GuideClient()
client.on("ready",function(){
    console.log(this)
    client.admin = "397063436049186818"
    client.admin.send("hi!")
    client.add_commandfolder("./commands/")
    client.listen()
})

client.login(process.env.beta)
