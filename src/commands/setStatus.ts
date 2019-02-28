import { Command } from "../Command"
import { Client, Message } from "discord.js"

let setStatus = new Command("setStatus", function (bot: Client, message: Message, args: string) {
    var status = args
    
    var alias = {
        red: "dnd"
    }
    if( alias[status] ){
       status = alias[status]
    }
       
    bot.user.setStatus(status)
})

module.exports = setStatus
