import { Command } from "vnft-commandhandler";
import { Attachment } from "discord.js";

const Canvas = require("canvas");
const colors = [
  "#ebedf0",
  "#c6e48b",
  "#7bc96f",
  "#196127"
];

const test = new Command();
test.name = "test";
test.funct = async (bot, message, args) => {
  const canvas = Canvas.createCanvas(250, 250);
  const ctx = canvas.getContext("2d");
  
  const pixels = [0,1,2,3];

  let x = 0;
  let y = 0;
  for( let pixel of pixels ){
    ctx.fillStyle = colors[pixel]
    ctx.fillRect(x*11, y*11, 10, 10);
    x++
    if(x==7){
      y++
      x=0
    }
  }

  const attachment = new Attachment(canvas.toBuffer(), `yee.png`);
  message.channel.send(args, attachment);
};

module.exports = test;
