const Discord = require("discord.js")
const GuideClient = require("./GuideClient")
const axios = require("axios")

class CommitGuide extends GuideClient{
  constructor(options={}){
    super()
    this.preview_tiles = options.preview_tiles || "─░▓█"
    this.top_left_day = options.top_left_day || "1970-01-01"
    this.target_image = options.target_image || "1111111122222413333344444444"
    this.lyrics = options.lyrics || false
    this.tile_sizes = options.tile_sizes || [0,1,5,10]
  }
  get day(){
    var day = (new Date(req_date)-new Date(this.top_left_day))/86400000
    var day_int = Math.floor(day)
    return day_int
  }
  async get_required_commits(req_date=new Date()){
    var daytile = this.target_image[this.day]
    var daysize = this.tile_sizes[daytile-1]
    return daysize
  }
  async get_made_commits(req_user="VonFriedricht", req_date=new Date()){
    // date: format YYYY-MM-DD
    var date = new Date(req_date).toISOString().split("T")[0]

    // getting github page
    var site = await axios.get(`https://github.com/${req_user}`)
    var sitecontent = site.data

    // regular expression to find the data-count for the given date
    var target_reg = new RegExp(`data-count="(.*?)" data-date="${date}"`,"g")
    var reg_result = target_reg.exec(sitecontent)
    var made_commits = reg_result[1]
    return made_commits
  }
}

module.exports = CommitGuide
