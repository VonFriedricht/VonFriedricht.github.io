import { Guide } from "./classes/Guide";
import * as path from "path";

let guide = new Guide();

guide.prefix = ".";

guide.loadCommands(path.join(__dirname, "commands"));
guide.loadScripts(path.join(__dirname, "scripts"));

guide.topLeftDay = new Date(process.env.top_left_day);
guide.targetImage = process.env.commit_image.split("").map(e => Number(e));
guide.lyrics = process.env.lyrics.split("+");

guide.on("error", e => {
  guide.discordUser.send(e.message);
});

guide.login(process.env.discord_token).then(() => {
  guide.discordUser = guide.users.find(u => u.username == "VonFriedricht");
  guide.githubUser = "VonFriedricht";
});
