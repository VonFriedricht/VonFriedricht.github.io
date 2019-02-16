import { CommandHandler } from "./CommandHandler"

var bot = new CommandHandler()
bot.read_commanddir(__dirname+"/commands")

async function main() {
    
    let vnft = bot.users.find(u=>u.id=="397063436049186818")
    bot.listen_user(vnft)

}

bot.login(process.env.beta).then(main)