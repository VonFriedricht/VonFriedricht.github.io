import { PassiveScript, PassiveFunc } from "../PassiveScript"
import { CommitGuide } from "../CommitGuide"

var script: PassiveFunc = function(bot: CommitGuide) {
    console.log(123)
}

var daily_commitcheck = new PassiveScript(script, 6000)

module.exports = daily_commitcheck
