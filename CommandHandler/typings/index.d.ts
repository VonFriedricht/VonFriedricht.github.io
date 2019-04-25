declare module "vnft-commandhandler"{
    import { Client, Message } from "discord.js";

    class CommandHandler extends Client{
        public loadCommands(target_path: string):boolean|void
        public loadScripts(target_path: string):boolean|void
    }

    class Script{

    }

    type CommandFunction = (bot: Client, message: Message, args: string) => any;
    class Command{
        name:string
        funct:CommandFunction
        constructor(name?: string, funct?: CommandFunction)
        execute(bot: Client, message: Message)
    }

}