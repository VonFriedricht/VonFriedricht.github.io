import { Guide } from "../../classes/Guide";
import { Message } from "discord.js";
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

module.exports = preview;

function generatePreview(image, tiles, day = -1): string {
  let weekdays = ["", "", "", "", "", "", ""];

  for (let i in image) {
    let v = image[i];
    let e = tiles[v - 1];

    // Marking the targeted day
    if (day == Number(i)) {
      e = `||${e}||`;
    }

    weekdays[Number(i) % 7] += e + e;
  }

  return weekdays.join("\n");
}
