import { PassiveScript, PassiveFunc } from "../PassiveScript";
import { hour } from "../time";
import { CommitGuide } from "../CommitGuide";

async function script(bot: CommitGuide) {
  let vnft = bot.users.find(u => u.id == "397063436049186818"); // lol, make it an ENV
  let user = "VonFriedricht"; // lol this too
  
  if (!vnft.dmChannel) {
    vnft.send("🤔");
    return false;
  } else {
    let made_commits = await bot.fetch_made_commits(user)
    vnft.send(made_commits)
  }
}

var out_of_time = new PassiveScript(script, hour);
module.exports = out_of_time;
