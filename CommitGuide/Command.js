class Command{
    constructor(name, func){
        this.name = name
        this.func = func
    }
    set name(new_name){
        if( typeof new_name == "string" ){
            this._name = new_name.toLowerCase()
        }
        else{
            throw "command-name has to be string"
        }
    }
    get name(){
        return this._name
    }
    execute(bot, message){
        var args = message.content.split(" ").slice(1).join(" ")
        console.log(message.content)
        this.func(bot, message, args)
    }
}

module.exports = Command
