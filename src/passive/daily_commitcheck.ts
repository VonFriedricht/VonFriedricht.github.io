import { PassiveScript, PassiveFunc } from "../PassiveScript"
import { CommitGuide, get_commitresponse } from "../CommitGuide"
import { hour, min, sec } from "../time";

var script: PassiveFunc = async function(bot: CommitGuide) {
    let vnft = bot.users.find(u=>u.id=="397063436049186818")
    let flag = `Current Day: ${bot.day}`

    if( !vnft.dmChannel ) {
        vnft.send("🤔")
        return false
    }
    else {
        let messages = await vnft.dmChannel.fetchMessages()
        let has_send = messages.some(m=>m.content==flag)
        if(!has_send) {
            vnft.send(flag)
            vnft.send(await get_commitresponse(bot))
        }
    }
}

var daily_commitcheck = new PassiveScript(script, hour)

module.exports = daily_commitcheck
