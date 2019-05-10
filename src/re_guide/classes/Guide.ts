import { CommandHandler } from "vnft-commandhandler";

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
  
  get required_commits(): number {
    let daytile = this.target_image[this.day];
    let daysize = this.tile_sizes[daytile - 1];
    return daysize;
  }

}
