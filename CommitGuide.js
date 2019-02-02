class CommitGuide{
    constructor(bot, options){
        this.preview_tiles = options.preview_tiles || "─░▓█"
        this.top_left_day = options.top_left_day || "1970-01-01"
        this.target_image = options.target_image || "1111111122222413333344444444"
        this.lyrics = options.lyrics || false
        this.tile_sizes = options.tile_sizes || [0,1,5,10]
        
        bot.on("message", (message) => {
            this.on_message(message)
        })
    }
    
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
    
    set target_image(new_value){
        this._target_image = new_value
    }
    get target_image(){
        return this._target_image
    }
    
    set lyrics(new_value){
        if(typeof new_value == "string"){
            new_value = new_value.split(" ")
        }
        this._lyrics = new_value
    }
    get lyrics(){
        return this._lyrics
    }
    
    set tile_sizes(new_value){
        this._tile_sizes = new_value
    }
    get tile_sizes(){
        return this._tile_sizes
    }
    
    get current_date(){
        var time_ms = new Date().getTime()-this.top_left_day.getTime()
        var time_days = time_ms/1000/60/60/24
        return Math.floor(time_days)
    }
    
    set target_image(new_value){
        if(typeof new_value[0] != "undefined"){
            this._target_image = new_value
        }
        else{
            console.error("target_image has to be some indexable")
        }
    }
    
    get preview(){
        var result = new Array(7).fill("")
        for( var i in this.target_image ){
            var tile = this.preview_tiles[this.target_image[i]-1]
            result[(i%7)] += tile+tile
        }
        return result.join("\n")
    }
    
    on_message(message){
        console.log(this)
        if(message.content == "test"){
            message.reply(this.preview_tiles)
        }
        if(message.content == ".preview"){
            message.channel.send(this.preview)
        }
        if(message.content == ".now"){
            message.channel.send(this.current_date)
        }
        if(message.content.startsWith(".phrases of ")){
            var parameter = message.content.substring(".phrases of ".length)
            message.channel.send(parameter)
        }
    }
}

module.exports = CommitGuide
