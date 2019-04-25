import * as fs from "fs";
import * as path from "path";

export function fetchJS(folder): string[] {
  let folderContent = fs.readdirSync(folder);
  let files = [];

  for (let entry of folderContent) {
    let entrypath = path.join(folder, entry);

    let isDir = fs.statSync(entrypath).isDirectory();
    let isFile = fs.statSync(entrypath).isFile();
    let ext = path.extname(entrypath);

    if (isDir) {
      files = files.concat(fetchJS(entrypath));
    }
    if (isFile && ext == ".js") {
      files.push(entrypath);
    }
  }

  return files;
}

module.exports = fetchJS
