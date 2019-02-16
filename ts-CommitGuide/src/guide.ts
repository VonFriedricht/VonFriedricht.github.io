import { CommitGuide } from "./CommitGuide"

var bot = new CommitGuide()

async function exec() {
    
    await bot.login(process.env.beta)
    let vnft = bot.users.find(u=>u.id=="397063436049186818")
    bot.listen_user(vnft)

    bot.read_commanddir(__dirname+"/commands")

}

exec()