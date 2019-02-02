/**
 * helping helper for the commits to make it an image ¯\_(ツ)_/¯
 */
class CommitGuide{
    constructor(bot, options){
        this.preview_tiles = options.preview_tiles || "─░▓█"
        this.top_left_day = options.top_left_day || "1970-01-01"
        this.target_image = options.target_image || "1111111122222413333344444444"
        this.lyrics = options.lyrics || false
        this.tile_sizes = options.tile_sizes || [0,1,5,10]
        
        if(options.admin){
            this.remind(options.admin,60*1000)
        }
        bot.on("message", (message) => {
            this.on_message(message)
        })
    }
    
    on_message(message){
        if(message.content == "test"){
            message.reply(this.preview_tiles)
        }
        if(message.content == ".preview"){
            message.channel.send(this.preview)
        }
        if(message.content == ".now"){
            var date = this.current_date
            var target = this.current_tile
            var preview = this.preview_tiles[target-1]
            var size = this.tile_sizes[target-1]
            var lyrics_snippet = this.current_lyrics

            message.channel.send(JSON.stringify({date, target, preview, size, lyrics_snippet}))
        }
        if(message.content.startsWith(".phrases of ")){
            var parameter = message.content.substring(".phrases of ".length)
            message.channel.send(parameter)
        }
    }
    
    remind(user, time){
        user.send("Hi!\n"+current_lyrics().join("\n"))
    }

   /**
    * tiles for the target_image-preview at the command .preview
    * @param {string|array} new_value the tiles for the preview
    */
    set preview_tiles(new_value){
        if(typeof new_value[0] != "undefined"){
            this._preview_tiles = new_value
        }
        else{
            console.error("preview_tiles has to be indexable")
        }
    }
    get preview_tiles(){
        return this._preview_tiles
    }
    
   /**
    * the date for the very first tile in the collection 
    * (should be the one on the top right)
    * @param {string|Date} time the date of the first tile
    */
    set top_left_day(time){
        if(new Date(time).getTime()){
            this._top_left_day = new Date(time)
        }
        else{
            console.error("top_left_day can't be an Invalid Time")
        }
    }
    get top_left_day(){
        return this._top_left_day
    }
    
   /**
    * setting the target_image for the commits
    * @param {string|array} new_value the new target_image
    */ 
    set target_image(new_value){
        if(typeof new_value[0] != "undefined"){
            this._target_image = new_value
        }
        else{
            console.error("target_image has to be some indexable")
        }
    }
    get target_image(){
        return this._target_image
    }
    
   /**
    * guiding thread for the commit-names
    * @param {string|array} new_value the new lyrics (string gets space-seperated by default)
    */
    set lyrics(new_value){
        if(typeof new_value == "string"){
            new_value = new_value.split(",")
        }
        this._lyrics = new_value.filter(element=>element.length>0)
    }
    get lyrics(){
        return this._lyrics
    }
    
   /**
    * the size of each tile in commits
    * @param {string|array} new_value the new tile-sizes
    */
    set tile_sizes(new_value){
        this._tile_sizes = new_value
    }
    get tile_sizes(){
        return this._tile_sizes
    }


    // get current_tile
    get current_tile(){
        return this.target_image[this.current_date]
    }

   /**
    * the current tile relative to the target_image-beginning
    */
    get current_date(){
        var time_ms = new Date("2019-02-05").getTime()-this.top_left_day.getTime()
        var time_days = time_ms/1000/60/60/24
        return Math.floor(time_days)
    }
    
   /**
    * getting the target_image translated into a preview
    */
    get preview(){
        var result = new Array(7).fill("")
        for(var i in this.target_image){
            var tile = this.preview_tiles[this.target_image[i]-1]
            result[(i%7)] += tile+tile
        }
        return result.join("\n")
    }

   /**
    * getting the current relevant lyrics-snippet
    */
    get current_lyrics(){
        var offset = 0
        this.target_image.substr(0,this.current_date).split("").forEach(tile=>{
            offset += +this.tile_sizes[+tile-1]
        })
        var current_size = this.tile_sizes[this.current_tile-1]
        return this.lyrics.slice(offset,offset+current_size)
    }
}

module.exports = CommitGuide
