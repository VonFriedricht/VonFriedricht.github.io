import { PassiveScript, PassiveFunc } from "../PassiveScript"
import { CommitGuide, get_commitresponse } from "../CommitGuide"

var bot
function eva:PassiveScript(b: Client)
{
    bot = b
    bot.on("message", function(message)
    {
        var admins = bot.admins || ["397063436049186818"]
        if( admins.includes(message.author.id) )
        {
            try
            {
                message.content.split("\`\`\`").filter(el=>el.startsWith("js\n")).forEach(el=>eval(el.substr(3)))
            }
            catch(err)
            {
                message.reply(err.message)
            }
        }
    })
}

module.exports = new PassiveScript(eva)
