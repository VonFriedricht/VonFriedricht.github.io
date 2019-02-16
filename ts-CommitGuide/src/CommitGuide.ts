import { Client, Message, User, Channel } from "discord.js"
import { Command } from "./Command"
import { readdir } from "fs"

export class CommitGuide extends Client {

    prefix: string
    commands: Command[]

    constructor() {
        super()
        
        this.prefix = "."
        this.commands = []
    }

    add_command(command: Command) {
        this.commands.push(command)
    }

    read_commanddir(dir: string) {
        var guide = this
        readdir(dir, function(error, list){
            console.log(list)
            list = list.filter(file=>file.match(/.js$/g))
            list.forEach(file => {
                guide.add_command(require(dir+"/"+file))
            })
            console.log(guide.commands)
        })
    }

    listen_user(user: User) {
        this.on("message",(message) => {
            if( message.author == user ){
                console.log(this.commands)
                this.handle_command(message)
            }
        })
    }

    listen_channel(channel: Channel) {
        this.on("message",(message) => {
            if( message.channel == channel ){
                console.log(this.commands)
                this.handle_command(message)
            }
        })
    }

    handle_command(message: Message) {
        var command = message.content.split(" ")[0].toLowerCase()
        var args = message.content.split(" ").slice(1).join(" ")

        if( !command.startsWith(this.prefix.toLowerCase()) ) {
            return false
        }
        command = command.substr(this.prefix.length)
        
        let target_command = this.commands.find(c=>c.name==command)
        if( target_command ) {
            target_command.execute(this, message, args)
        }
    }

}