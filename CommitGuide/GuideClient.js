const Discord = require("discord.js")
const Client = Discord.Client
const fs = require("fs")

class GuideClient extends Client{
  constructor(){
    super()
    this.prefix = "."
    this.commands = []
  }
  set admin(new_admin){
    if( typeof new_admin == "string" ){
      this._admin = this.users.find(u=>u.id==new_admin)
    }
    if( new_admin instanceof Discord.User ){
      this._admin = new_admin
    }
  }
  get admin(){
    if( this._admin ){
      return this._admin
    }
  }
    
  add_command(name, func){
    var command = new Command(name, func)
    this.commands.push(command)
  }
  add_commandfolder(commandfolder){
    if(commandfolder){
      if(!commandfolder.match(/\/$/)){
        commandfolder = commandfolder+"/"               
      }
      fs.readdirSync(commandfolder).forEach(file=>{
        var filename = file.split(".")
        if( filename[1] == "js" ){
          try{ 
            this.add_command(`${this.prefix}${filename[0]}`, require(`${commandfolder}${file}`))
          }
          catch(err){ 
            console.log(err) 
          }
        }
      })
    }
  }
  exec_command(message){
    var command = message.content.toLowerCase().split(" ")[0]
    var target_command = this.commands.find(c=>c.name==command)
    if( target_command ){
      target_command.execute(this, message)
    }
  }
  listen(commandfolders){
    if(typeof commandfolders == "string"){
      commandfolders = [commandfolders]
    }
    if(Array.isArray(commandfolders)){
      commandfolders.forEach(this.add_commandfolder)
    }
    this.on("message",this.exec_command)
  }
}

module.exports = GuideClient
