class CommitGuide{
  constructor(bot, options){
    this.bot = bot
    
    this.preview_tiles = options.preview_tiles || "─░▓█"
    this.top_left_day = options.top_left_day || "1970-01-01"
    this.target_image = options.target_image || "1111111122222413333344444444"
    this.lyrics = options.lyrics || false
    this.tile_sizes = options.tile_sizes || [0,1,5,10]
    this.admin = options.admin || -1
              
    this.bot.on("ready", () => {
        bot.admin = bot.users.find(user=>user.id==this.admin)
        this.on_ready(bot)
        console.log("CommitGuide Ready!")
    })
    this.bot.on("message", (message) => {
      this.on_message(message)
    })
  }
}
