const Discord = require("discord.js")
const GuideClient = require("./GuideClient")

class CommitGuide extends GuideClient{
  constructor(options={}){
    super()
    this.preview_tiles = options.preview_tiles || "─░▓█"
    this.top_left_day = options.top_left_day || "1970-01-01"
    this.target_image = options.target_image || "1111111122222413333344444444"
    this.lyrics = options.lyrics || false
    this.tile_sizes = options.tile_sizes || [0,1,5,10]
  }
}

module.exports = CommitGuide
