"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandHandler_1 = require("./CommandHandler");
let axios = require("axios");
class CommitGuide extends CommandHandler_1.CommandHandler {
    constructor(options = {}) {
        super();
        this.preview_tiles = options.preview_tiles || "─░▓█";
        this.top_left_day = options.top_left_day || "1970-01-01";
        this.target_image = options.target_image || "1111111122222413333344444444".split("").map(e => Number(e));
        this.lyrics = options.lyrics || [];
        this.tile_sizes = options.tile_sizes || [0, 1, 5, 10];
    }
    get day() {
        var day = (new Date().getTime() - new Date(this.top_left_day).getTime()) / 86400000;
        var day_int = Math.floor(day);
        return day_int;
    }
    async fetch_made_commits(username) {
        // today: format YYYY-MM-DD
        let today_ISO = new Date().toISOString().split("T")[0];
        // getting github page
        let site = await axios.get(`https://github.com/${username}`);
        let sitecontent = site.data;
        // regular expression to find the data-count for the given date
        let target_reg = new RegExp(`data-count="(.*?)" data-date="${today_ISO}"`, "g");
        let reg_result = target_reg.exec(sitecontent);
        let made_commits = reg_result[1];
        return Number(made_commits);
    }
    get required_commits() {
        let daytile = this.target_image[this.day];
        let daysize = this.tile_sizes[daytile - 1];
        return daysize;
    }
    async fetch_next_words(count) {
        let words = this.lyrics;
        let header = await this.fetch_last_commits(25);
        let next_words = [];
        for (let i in words) {
            if (words[i].toLowerCase() == header[0].toLowerCase()) {
                let j;
                for (j in header) {
                    let word_pointer = Number(i) + Number(j);
                    if (words[word_pointer].toLowerCase() != header[j].toLowerCase()) {
                        break;
                    }
                }
                if (Number(j) + 1 == header.length && Number(j) > 0) {
                    let wordgroup = [];
                    let word_pointer = Number(i) + Number(j) + 1;
                    for (let k = 0; k < count && words[word_pointer + (+k)]; k++) {
                        wordgroup.push(words[word_pointer + (+k)]);
                    }
                    next_words.push(wordgroup);
                }
            }
        }
        if (next_words.length) {
            return next_words;
        }
        else {
            return [["no words"]];
        }
    }
    async fetch_next_words_toString(count) {
        let wordgroups = await this.fetch_next_words(count);
        return wordgroups.map(wordgroup => `\`${wordgroup.join("\n")}\``).join(" ");
    }
    async fetch_last_commits(count, url) {
        let site = await axios.get(url ? url : "https://github.com/VonFriedricht/Weight-of-the-World/commits/master");
        let sitecontent = site.data;
        let commit_net = /message js-navigation-open.*?>(.*?)<\/a>/g;
        let commit = null;
        let commits = [];
        for (let i = 0; i < count && (commit = commit_net.exec(sitecontent)[1]); i++) {
            commits.push(commit);
        }
        return commits.reverse();
    }
}
exports.CommitGuide = CommitGuide;
