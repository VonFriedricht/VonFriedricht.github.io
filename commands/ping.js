const { Command } = require( "vnftjs")

const ping = new Command()
ping.name = 'next'

ping.funct = (bot, message, args) => {
  message.channel.send("pong")
}

module.exports = ping
