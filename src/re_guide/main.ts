import { Guide } from "./classes/Guide";
import * as path from "path";

let guide = new Guide();

guide.prefix = ".";

guide.loadCommands(path.join(__dirname, "commands"));
guide.loadScripts(path.join(__dirname, "scripts"));

guide.preview_tiles = ["─", "░", "▓", "█"];
guide.top_left_day = new Date(process.env.top_left_day);
guide.target_image = process.env.commit_image.split("").map(e => Number(e));

guide.on("error", e => {
  guide.users.find(u => u.username == "VonFriedricht").send(e.message);
});

guide.login(process.env.discord_token);
