import { Script } from 'vnftjs'
import { Guide } from '../classes/Guide'
import { time } from 'vnft-tools'

const outOfTime = new Script()
outOfTime.intervalTime = time.hour / 2

outOfTime.funct = async (bot: Guide) => {
  let vnft = bot.discordUser

  if (!vnft.dmChannel) {
    await vnft.send(' ').catch(e => {
      return
    })
  }
  let made: number = await bot.fetchMadeCommits(bot.githubUser)
  let required: number = bot.requiredCommits

  let done = made >= required

  if (done) {
    let flag = `Day ${bot.day} Done!`
    let messages = await vnft.dmChannel.fetchMessages()
    let alreadySent = messages.some(m => m.content == flag)
    if (!alreadySent) {
      vnft.send(flag)
    }
  } else {
    let nextWord = await bot.nextWords(1)
    let timeShort = new Date().getHours() > 15
    if (timeShort) {
      let reminder = `${made} by ${required} done\nNext Word: \`${nextWord}\``
      vnft.send(reminder)
    }
  }
}

module.exports = outOfTime
