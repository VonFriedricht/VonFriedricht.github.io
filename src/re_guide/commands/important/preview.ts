import { Message } from "discord.js";
import { Guide } from "../../classes/Guide";
import { Command } from "../../classes/Command";

const preview = new Command();
preview.name = "preview";
preview.funct = function(bot: Guide, message: Message, args: string) {
  let preview: string;
  if (args == "now") {
    preview = generatePreview(bot.target_image, bot.preview_tiles, bot.day);
  } else {
    preview = generatePreview(bot.target_image, bot.preview_tiles);
  }
  message.channel.send(preview);
};

function generatePreview(image, tiles, day = -1): string {
  let weekdays = ["", "", "", "", "", "", ""];
  for (let i in image) {
    let v = image[i];
    let e = tiles[v - 1];
    if (day == Number(i)) {
      weekdays[Number(i) % 7] += "||" + e + e + "||";
    } else {
      weekdays[Number(i) % 7] += e + e;
    }
  }
  return weekdays.join("\n");
}
