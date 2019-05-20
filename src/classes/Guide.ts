import { CommandHandler } from "vnftjs";
import axios from "axios";

export class Guide extends CommandHandler {
  targetImage: number[];
  topLeftDay: Date;
  tileSizes: number[];
  lyrics: string[];

  constructor() {
    super();
    this.tileSizes = [0, 1, 5, 10];
    this.targetImage = [1, 2, 3, 4];
    this.topLeftDay = new Date();
    this.lyrics = ["no", "lyrics", "set"];
  }

  get day(): number {
    var day = (new Date().getTime() - new Date(this.topLeftDay).getTime()) / 86400000;
    var day_int = Math.floor(day);
    return day_int;
  }

  get requiredCommits(): number {
    let daytile = this.targetImage[this.day];
    let daysize = this.tileSizes[daytile - 1];
    return daysize;
  }

  async fetchMadeCommits(username: string): Promise<number> {
    // today: format YYYY-MM-DD
    let today_ISO = new Date().toISOString().split("T")[0];

    // getting github page
    let site = await axios.get(`https://github.com/` + username);
    let sitecontent: string = site.data;

    // regular expression to find the data-count for the given date
    let target_reg = new RegExp(`data-count="(.*?)" data-date="${today_ISO}"`, "g");
    let reg_result = target_reg.exec(sitecontent);
    let made_commits = reg_result[1];

    return Number(made_commits);
  }

  async fetchLastCommits(count: number, url?: string): Promise<string[]> {
    if (!url) {
      url = "https://github.com/VonFriedricht/Weight-of-the-World/commits/master";
    }
    let site = await axios.get(url);
    let sitecontent: string = site.data;

    let commit_net = /message js-navigation-open.*?>(.*?)<\/a>/g;

    let commit: string = null;
    let commits: string[] = [];

    while (commits.length < count && (commit = commit_net.exec(sitecontent)[1])) {
      commits.push(commit);
    }

    return commits.reverse();
  }

  async nextWords(wordcount: number): Promise<String[][]> {
    let lyrics: string[] = this.lyrics;
    let header: string[] = await this.fetchLastCommits(25);
    let next_words: string[][] = [];

    for (let i in lyrics) {
      if (lyrics[i].toLowerCase() == header[0].toLowerCase()) {
        let j: string;
        for (j in header) {
          let word_pointer = Number(i) + Number(j);
          if (
            typeof lyrics[word_pointer] == "undefined" ||
            lyrics[word_pointer].toLowerCase() != header[j].toLowerCase()
          ) {
            break;
          }
        }

        if (Number(j) + 1 == header.length && Number(j) > 0) {
          let wordgroup: string[] = [];

          let word_pointer = Number(i) + Number(j) + 1;
          for (let k = 0; k < wordcount && lyrics[word_pointer + +k]; k++) {
            wordgroup.push(lyrics[word_pointer + +k]);
          }
          next_words.push(wordgroup);
        }
      }
    }

    return next_words;
  }
}
