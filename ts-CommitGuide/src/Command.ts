import { Client, Message } from "discord.js"

// export type CommandName = /^[A-Za-z0-9]+$/ ♥ please make it happen
export type CustomCommand = (bot: Client, message: Message, args: string) => void

export class Command {

    _name: string // CommandName
    func: CustomCommand

    constructor(name: string, func: CustomCommand) {
        this.name = name
        this.func = func
    }

    set name(name: string) {
        if( name.match(/^[A-Za-z0-9]+$/) ){
            this._name = name.toLowerCase()
        }
        else{
            let illegal_letters = name.replace(/[A-Za-z0-9]/g,"")
            throw `Commandname "${name}" must be /^[A-Za-z0-9]+$/, but found: "${illegal_letters}"`
        }
    }

    get name() {
        return this._name
    }

    execute(bot: Client, message: Message, args: string) {
        console.log(`Executing "${this.name}" with args: "${args}"`)
        this.func(bot, message, args)
    }

}