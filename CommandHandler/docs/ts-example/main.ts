import { CommandHandler } from "../../src";
import * as path from "path";

const client = new CommandHandler();
client.prefix = "!";

client.loadCommands(path.join(__dirname, "commands"));

client.login("Discord Token");
