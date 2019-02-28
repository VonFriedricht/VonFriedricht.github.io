import { Command } from "../Command"
import { Client, Message, PresenceStatus } from "discord.js"

type AdvancedPresenceStatus = PresenceStatus | "red" | "green" | "yellow" | "grey";
let Presences:PresenceStatus[] = ["online", "dnd", "idle", "invisible"];

interface palias {
    red: PresenceStatus
}

let setStatus = new Command("setStatus", function (bot: Client, message: Message, args: string) {

    if( isFinite(Number(args)) ){
        var index = Number(status)
        bot.user.setStatus(Presences[index])
    }/*
    else{
        bot.user.setStatus(args)
    }*/
    
       
})

module.exports = setStatus
