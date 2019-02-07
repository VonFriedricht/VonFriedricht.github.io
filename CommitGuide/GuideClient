const Discord = require("discord.js")
const Client = Discord.Client

class GuideClient extends Client{
  constructor(admin_id){
    super()
    this.on("ready",function(){
        console.log(this)
        this.admin = admin_id
        this.admin.send("hi!")
    })
  }
  set admin(new_admin){
    if( typeof new_admin == "string" ){
      this._admin = this.users.find(u=>u.id==new_admin)
    }
  }
  get admin(){
    return this._admin
  }
}

var client = new GuideClient("397063436049186818")
client.login("ayyyy lmao")
