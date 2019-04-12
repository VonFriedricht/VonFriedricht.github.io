import { PassiveScript, PassiveFunc } from "../PassiveScript";
import { hour, minute } from "../time";
import { CommitGuide } from "../CommitGuide";

async function script(bot: CommitGuide) {
  let vnft = bot.users.find(u => u.id == "397063436049186818"); // lol, make it an ENV
  let user = "VonFriedricht"; // lol this too
  
  if (!vnft.dmChannel) {
    vnft.send("🤔");
    return false;
  } else {
    let made_commits: number = await bot.fetch_made_commits(user)
    let required_commits: number = bot.required_commits
    let done = made_commits >= required_commits
    if( !done ){
      let time_short = new Date().getHours() > 15
      if( time_short ){
        // remind
        let reminder = `${made_commits} by ${required_commits} done`
        vnft.send(reminder)
      }
    }
  }
}

var out_of_time = new PassiveScript(script, 0.5*hour+minute);
module.exports = out_of_time;
