import { PassiveScript, PassiveFunc } from "../PassiveScript"
import { CommitGuide } from "../CommitGuide"
import { hour } from "../time";

var script: PassiveFunc = function(bot: CommitGuide) {
    console.log(123)
}

var daily_commitcheck = new PassiveScript(script, 1*hour)

module.exports = daily_commitcheck
