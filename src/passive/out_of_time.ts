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
    let made_commits = await bot.fetch_made_commits(user)
    let required_commits = await bot.required_commits(user)
    let done = made_commits >= required_commits
    if( !done ){
      vnft.send([made_commits,required_commits,done].join(", "))
    }
  }
}

var out_of_time = new PassiveScript(script, hour+minute);
module.exports = out_of_time;
