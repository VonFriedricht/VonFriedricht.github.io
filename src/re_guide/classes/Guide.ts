import { CommandHandler } from "vnft-commandhandler";
import axios from "axios";

export class Guide extends CommandHandler {
  target_image: number[];
  top_left_day: Date;
  preview_tiles: string[];
  tile_sizes: number[];

  constructor() {
    super();
    this.tile_sizes = [0,1,5,10];
    this.target_image = [1, 2, 3, 4];
    this.top_left_day = new Date();
    this.preview_tiles = ["A", "B", "C", "D", "E"];
  }

  get day(): number {
    var day = (new Date().getTime() - new Date(this.top_left_day).getTime()) / 86400000;
    var day_int = Math.floor(day);
    return day_int;
  }
  
  get requiredCommits(): number {
    let daytile = this.target_image[this.day];
    let daysize = this.tile_sizes[daytile - 1];
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

  async nextWords(wordcount: number): Promise<Array<String>>{
    return ["tbd"]
  }

}
