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
    var day = (new Date()-new Date(this.top_left_day))/86400000
    var day_int = Math.floor(day)
    return day_int
  }
  async get_required_commits(){
    var daytile = this.target_image[this.day]
    var daysize = this.tile_sizes[daytile-1]
    return daysize
  }
  async get_made_commits(req_user="VonFriedricht"){
    // date: format YYYY-MM-DD
    var date = new Date().toISOString().split("T")[0]

    // getting github page
    var site = await axios.get(`https://github.com/${req_user}`)
    var sitecontent = site.data

    // regular expression to find the data-count for the given date
    var target_reg = new RegExp(`data-count="(.*?)" data-date="${date}"`,"g")
    var reg_result = target_reg.exec(sitecontent)
    var made_commits = reg_result[1]
    return made_commits
  }
  async get_next_words(solutions){
    var all = this.lyrics
    var key = (await this.get_last_commits(5)).reverse()
    var requested_solutions = solutions
    var solution = []
    for( var i = 0; i < all.length; i++ ){
      if( all[i].toLowerCase() == key[0].toLowerCase() ){
        for( var j = 0; j < key.length; j++ ){
          if( all[i+j].toLowerCase() != key[j].toLowerCase() ){
            break;
          }
        }
        if( j == key.length ){
          solution.push("###")
          for( var k = 0; k < requested_solutions && all[i+j+k]; k++ ){
            solution.push(all[i+j+k])
          }
          solution.push("###\n")
        }
      }
    }
    return solution
  }
  async get_last_commits(number=5, req_url){
    var url = req_url || "https://github.com/VonFriedricht/Weight-of-the-World/commits/master"
    var commits = await axios.get(url)

    var commitname_reg = /message js-navigation-open.*?>(.*?)<\/a>/g
    var commitsite_data = commits.data
    var i = number
    var b = ""
    var last_commits = []
    while( (b = commitname_reg.exec(commitsite_data)) && i-->0 ){
      last_commits.push(b[1])
    }
    return last_commits
  }
}

module.exports = CommitGuide
