import { Guide } from "./classes/Guide";
import * as path from "path";

let guide = new Guide();

guide.loadCommands(path.join(__dirname, "commands"));
guide.loadScripts(path.join(__dirname, "scripts"));

guide.login(process.env.token);
