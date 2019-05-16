import { Script } from "vnft-commandhandler";
import { Guide } from "classes/Guide";
import { time } from "vnft-tools";

const outOfTime = new Script();

outOfTime.funct = async (bot: Guide) => {
  let vnft = bot.users.find(u => u.id == "397063436049186818");
  let user = "VonFriedricht";

  if (!vnft.dmChannel) {
    await vnft.send(" ").catch(e => {
      return;
    });
  }
  let made: number = await bot.fetchMadeCommits(user);
  let required: number = bot.requiredCommits;

  let done = made >= required;

  if (!done) {
    let timeShort = new Date().getHours() > 15;
    if (timeShort) {
      let reminder = `${made} by ${required} done`;
      vnft.send(reminder);
    }
  }
};

outOfTime.intervalTime = time.hour / 2;

module.exports = outOfTime;
