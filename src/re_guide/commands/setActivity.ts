import { Command } from "../classes/Command";

const setActivity = new Command();
setActivity.name = "setActivity";
setActivity.funct = function(b, m, a) {
  b.user.setActivity(a);
};

module.exports = [setActivity];
