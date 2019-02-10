const Discord = require("discord.js")
const GuideClient = require("./GuideClient")

class CommitGuide extends GuideClient{
  constructor(options){
    this.preview_tiles = options.preview_tiles || "─░▓█"
    this.top_left_day = options.top_left_day || "1970-01-01"
    this.target_image = options.target_image || "1111111122222413333344444444"
    this.lyrics = options.lyrics || false
    this.tile_sizes = options.tile_sizes || [0,1,5,10]
    this.admin = options.admin || -1
    
    this.admin.send("you shall be king")
  }
  set admin(new_admin){
    this._admin = bot.users.find(u=>u.id==new_admin)
  }
  get admin(){
    return this._admin
  }
}
