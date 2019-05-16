import { Command } from "vnft-commandhandler";
import { Attachment } from "discord.js";
import { Guide } from "classes/Guide";

const Canvas = require("canvas");
const colors = [null, "#ebedf0", "#c6e48b", "#7bc96f", "#196127"];

const preview = new Command();
preview.name = "preview";
preview.funct = async (bot: Guide, message, args) => {
  const pixels = bot.target_image;

  const canvas = Canvas.createCanvas(Math.ceil(pixels.length / 7) * 11, 11 * 7);
  const ctx = canvas.getContext("2d");

  let x = 0;
  let y = 0;
  let day = 0;
  for (let pixel of pixels) {
    if (day == bot.day) {
      ctx.fillStyle = "red";
      ctx.fillRect(x * 11 - 1, y * 11 - 1, 12, 12);
    }
    ctx.fillStyle = colors[pixel];
    ctx.fillRect(x * 11, y * 11, 10, 10);
    y++;
    day++;
    if (y == 7) {
      x++;
      y = 0;
    }
  }

  const attachment = new Attachment(canvas.toBuffer(), `yee.png`);
  message.channel.send(args, attachment);
};

module.exports = preview;
