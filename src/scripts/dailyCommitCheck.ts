import { Script } from "vnft-commandhandler";
import { time } from "vnft-tools";
import { Guide } from "classes/Guide";

const check = new Script();
check.intervalTime = time.hour;

check.funct = async (bot: Guide): Promise<boolean | void> => {
  let vnft = bot.users.find(u => u.id == "397063436049186818"); // lol, make it an ENV
  let flag = `Current Day: ${bot.day}`;

  if (!vnft.dmChannel) {
    vnft.send(" ").catch(console.log);
  } else {
    let messages = await vnft.dmChannel.fetchMessages();
    let has_send = messages.some(m => m.content == flag);
    if (!has_send) {
      vnft.send(flag);
      // Message:  Commits: Made / Required
      let made = await bot.fetchMadeCommits("VonFriedricht");
      let required = bot.requiredCommits;
      vnft.send(`Commits: ${made} / ${required}`);

      // Message:  commits
      let wordcount = required - made;
      let wordgroups = await bot.nextWords(wordcount);
      let response = [];
      for (let wordgroup of wordgroups) {
        response.push(`\`${wordgroup.join("\n")}\``);
      }
      vnft.send(response.join("\n"));
    }
  }
};

module.exports = check;
