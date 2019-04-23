import { CommandHandler } from "./CommandHandler";

export class Guide extends CommandHandler {
  target_image: number[];
  top_left_day: Date;
  preview_tiles: string[];

  constructor() {
    super();
    this.target_image = [1, 2, 3, 4];
    this.top_left_day = new Date();
    this.preview_tiles = ["A", "B", "C", "D", "E"];
  }

  get day(): number {
    var day = (new Date().getTime() - new Date(this.top_left_day).getTime()) / 86400000;
    var day_int = Math.floor(day);
    return day_int;
  }
}
