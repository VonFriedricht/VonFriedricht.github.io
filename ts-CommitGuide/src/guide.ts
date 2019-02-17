import { CommandHandler } from "./CommandHandler"

var bot = new CommitGuide({
    top_left_day: process.env.top_left_day,
    target_image: process.env.commit_image.split("").map(e=>Number(e)),
    lyrics: process.env.lyrics.split("+")
})

bot.read_commanddir(__dirname+"/commands")

bot.login(process.env.beta).then(()=>{
    let vnft = bot.users.find(u=>u.id=="397063436049186818")
    bot.listen_user(vnft)
})
