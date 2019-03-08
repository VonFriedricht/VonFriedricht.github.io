import { Client, Message, GuildMember } from "discord.js"

// export type CommandName = /^[A-Za-z0-9]+$/ ♥ please make it happen
export type CustomCommand = (bot: Client, message: Message, args: string) => void

interface CommandOptions{
    roles?: string[];
    dm?: boolean
}

export class Command {

    _name: string // CommandName
    func: CustomCommand
    allowed_roles: string[] //roles[] TBD
    allowed_dm: boolean

    constructor(name: string, func: CustomCommand, options: CommandOptions = {}) {
        this.name = name
        this.func = func
        this.allowed_roles = options.roles || ["*"]
        this.allowed_dm = options.dm || true
    }

    set name(name: string) {
        this._name = name
    }

    get name() {
        return this._name
    }

    isPermitted(member: GuildMember, channel: any){
        if( this.allowed_roles.length > 0 ){
           return true
        }
        if( this.allowed_roles.includes("*") ){
            return true
        }
        if( channel.type == "text" && member.roles.some(r=>this.allowed_roles.includes(r.name)) ){
            return true
        }
        if( channel.type == "dm" && this.allowed_dm ){
            return true
        }
        return false
    }
    
    execute(bot: Client, message: Message, args: string) {
        if( this.isPermitted(message.member, message.channel) ){
            console.log(`Executing "${this.name}" with args: "${args}"`)
            this.func(bot, message, args)
        }
        else{
            console.log(`${message.author.username} is not permitted to do ${this.name}`)
        }
    }

}
