import { Script } from "vnftjs";
import { Guide } from "../classes/Guide";

const activity = new Script();

activity.funct = async (client: Guide) => {
  const done = await client.fetchMadeCommits("VonFriedricht");
  const required = client.requiredCommits;
  const progress = `${done} / ${required}`;
  const nextword = await client.nextWords(1);
  client.user.setActivity(`${progress} ${nextword}`);
}

module.exports = activity;
