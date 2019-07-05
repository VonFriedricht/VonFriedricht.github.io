import { Script } from 'vnftjs'
import { time } from 'vnft-tools'
import { Guide } from '../classes/Guide'

const activity = new Script()
activity.intervalTime = time.minute

activity.funct = async (client: Guide) => {
  const done = await client.fetchMadeCommits(client.githubUser)
  const required = client.requiredCommits
  if (done >= required) {
    client.user.setActivity(`Done!`)
  } else {
    const progress = `${done} / ${required}`
    const nextword = await client.nextWords(1)
    client.user.setActivity(`${progress} ${nextword}`)
    console.log(`${progress} ${nextword}`)
  }
}

module.exports = activity
