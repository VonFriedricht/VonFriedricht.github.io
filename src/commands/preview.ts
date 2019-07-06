import { Command } from 'vnftjs'
import { Attachment } from 'discord.js'
import { Guide } from '../classes/Guide'

const preview = new Command()
preview.name = "preview"
preview.addAlias("p")

try {
  const Canvas = require('canvas')

  preview.name = 'preview'
  preview.addAlias('p')
  preview.funct = async (bot: Guide, message, args) => {
    const pixels = bot.targetImage
    const colors = [null, '#ebedf0', '#c6e48b', '#7bc96f', '#196127']

    const pixelSize = 12
    const pixelMargin = 2
    const pixelSpace = pixelSize + pixelMargin
    const highlightSize = 2

    const pixelRows = Math.ceil(pixels.length / 7)

    const canvas = Canvas.createCanvas(pixelRows * pixelSpace, pixelSpace * 7)
    const ctx = canvas.getContext('2d')

    let x = 0
    let y = 0
    let day = 0
    for (let pixel of pixels) {
      let pixelX = x * pixelSpace
      let pixelY = y * pixelSpace
      if (day == bot.day) {
        ctx.fillStyle = 'red'
        ctx.fillRect(
          pixelX - highlightSize + pixelMargin / 2,
          pixelY - highlightSize + pixelMargin / 2,
          pixelSize + highlightSize * 2,
          pixelSize + highlightSize * 2
        )
      }
      ctx.fillStyle = colors[pixel]
      ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize)

      y++
      day++
      if (y == 7) {
        x++
        y = 0
      }
    }

    const attachment = new Attachment(canvas.toBuffer(), `preview.png`)
    message.channel.send(args, attachment)
  }
} catch (err) {
  console.log(err)
}

export = preview
