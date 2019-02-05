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
        this.admin = options.admin || -1
                
        bot.on("ready", () => {
            bot.admin = bot.users.find(user=>user.id==this.admin)
            this.on_ready(bot)
            console.log("CommitGuide Ready!")
        })
        bot.on("message", (message) => {
            this.on_message(message)
        })
    }
    
    /**
    * function that triggers after the bot successfully connects
    * @param {Discord.Client} bot the the bot-client
    */
    async on_ready(bot){
        console.log(this)
        if( bot.admin ){
            await bot.admin.send("booted")
            setInterval(this.remind,60*60*1000,bot.admin)
        }
    }
    
    /**
    * function that triggers when a message is received by the bot
    * @param {Discord.message} message the message itself
    */
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
    
    async remind(user, time){
        let remind_flag = `commits for day ${this.current_date}`
        if( !user.dmChannel ){
            await user.send(":thinking:")
        }
        let has_already_remind = (await user.dmChannel.fetchMessages()).some(message=>message.content==remind_flag)
        if( !has_already_remind ){
            user.send(remind_flag)
            user.send(this.current_lyrics.join("\n"))
        }
        else{
            console.log(`not sending "${remind_flag}"`)
        }
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
        var time_ms = new Date().getTime()-this.top_left_day.getTime()
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
            console.log(offset, tile)
            offset += parseInt(this.tile_sizes[parseInt(tile)-1])
        })
        var current_size = this.tile_sizes[this.current_tile-1]
        return this.lyrics.slice(offset-1,offset+current_size-1)
    }
}

module.exports = CommitGuide
