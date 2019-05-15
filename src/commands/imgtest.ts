import { Command } from "vnft-commandhandler";
import { Attachment } from "discord.js";

const Canvas = require("canvas");

const test = new Command();
test.name = "test";
test.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(250, 250);
  const ctx = canvas.getContext("2d");

  ctx.fillRect(50, 50, 150, 150);

  const attachment = new Attachment(canvas.toBuffer(), `yee.png`);
  message.channel.send(args, attachment);
};

module.exports = test;
