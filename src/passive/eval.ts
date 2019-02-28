import { PassiveScript, PassiveFunc } from "../PassiveScript"
import { CommitGuide, get_commitresponse } from "../CommitGuide"

var bot

module.exports = new PassiveScript( b: Client => {
    bot = b
    bot.on("message", message=>{
        var admins = bot.admins || ["397063436049186818"]
        // eval for the admins - what can go wrong
        if( admins.includes(message.author.id) ){
            try{
                message.content.split("\`\`\`").filter(el=>el.startsWith("js\n")).forEach(el=>eval(el.substr(3)))
            }
            catch(err){
                message.reply(err.message)
            }
        }
    })
})
