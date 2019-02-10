const CommitGuide = require("./CommitGuide.js")

var client = new CommitGuide({
  top_left_day: process.env.top_left_day,
  target_image: process.env.commit_image,
  lyrics: process.env.lyrics.split("+")
})

client.on("ready",function(){
  client.listen("./CommitGuide/commands/")
  client.admin="397063436049186818"
  //client.admin.send("nyeh!")
  
  setInterval(function(){
    var reminder = `Its Day: ${client.day}`
    remindorino(reminder, client.admin)
  },10000)
})

client.login(process.env.beta)

async function remindorino(reminder, target_user){
  if(!target_user.dmChannel){
    await target_user.send(":thinking:")
  }
  let last_messages = await user.dmChannel.fetchMessages()
  let has_already_remindorino = last_messages.some(m=>m.content==reminder)
  if(!has_already_remindorino){
     target_user.send(reminder)
  }
}
