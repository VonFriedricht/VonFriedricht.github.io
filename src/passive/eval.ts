import { PassiveScript, PassiveFunc } from "../PassiveScript";
import { CommitGuide, get_commitresponse } from "../CommitGuide";

var bot;
var script: PassiveFunc = async function(b: CommitGuide) {
  bot = b;
  bot.on("message", function(message) {
    var admins = bot.admins || ["397063436049186818"];
    if (admins.includes(message.author.id)) {
      try {
        message.content
          .split("```")
          .filter(el => el.startsWith("js\n"))
          .forEach(el => eval(el.substr(3)));
      } catch (err) {
        message.reply(err.message);
      }
    }
  });
};

var passive_eva = new PassiveScript(script);

module.exports = passive_eva;
