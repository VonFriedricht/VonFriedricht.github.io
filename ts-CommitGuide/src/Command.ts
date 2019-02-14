import { Client, Message } from "discord.js"

// export type CommandName = /^[A-Za-z0-9]+$/ ♥ please make it happen
export type CustomCommand = (bot: Client, message: Message, args: string) => void

export class Command {

    name: string // CommandName
    func: CustomCommand

    constructor(name: string, func: CustomCommand) {
        this.name = name
        this.func = func
    }

    execute(bot?: Client, message?: Message, args?: string) {
        console.log(`Executing ${this.name} with args: ${args}`)
        this.func(bot, message, args)
    }

}