import { Message } from "discord.js";
import { Guide } from "../../classes/Guide";
import { Command } from "../../classes/Command";

async function preview(bot: Guide, message: Message, args: string): Promise<void> {
  let preview: string;

  if (args == "now") {
    preview = generatePreview(bot.target_image, bot.preview_tiles, bot.day);
  } else {
    preview = generatePreview(bot.target_image, bot.preview_tiles);
  }

  message.channel.send(preview);
}

module.exports = new Command("preview", preview);

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
