const Discord = require("discord.js")
const Client = Discord.Client

class GuideClient extends Client{
    constructor(){
      super()
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
    exec_command(message){
        var command = message.content.toLowerCase().split(" ")[0]
        var target_command = this.commands.find(c=>c.name==command)
        if( target_command ){
            target_command.execute(this, message)
        }
    }
    listen(){
        this.on("message",this.exec_command)
    }
}
