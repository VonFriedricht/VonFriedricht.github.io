import { Client } from "discord.js"

export type PassiveFunc = (bot: Client) => void

export class PassiveScript {
    
    func: PassiveFunc
    interval: number
    
    constructor(func: PassiveFunc, interval: number) {
        this.func = func
        this.interval = interval
    }
    
    exec(bot: Client) {
        var target_client: Client = bot
        var target_script: PassiveScript = this
        
        if( this.interval > 0 ) {
            setInterval(function() {
                target_script.func(target_client)
            }, this.interval)
        }
        else{
            target_script.func(target_client)
        }
    }
    
}
