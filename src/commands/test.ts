import { Command } from 'vnftjs'

const reee = new Command()

reee.name = 'reee'

reee.funct = (bot, message, args) => {
  const Canvas = require('canvas')
  const { Attachment } = require('discord.js')
  const canvas = Canvas.createCanvas(50, 50)
  const ctx = canvas.getContext('2d')
  ctx.fillRect(10, 10, 20, 30)

  const attachment = new Attachment(canvas.toBuffer(), `reee.png`)
  message.channel.send(' ', attachment)
}

export = reee
