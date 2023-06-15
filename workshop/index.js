import Formatter from "./scenario.js";
import Scenarist from "scenarist.dev";
import {createReadStream, writeFileSync} from "fs";
import {createInterface} from "readline"

const play = Scenarist(new Formatter());

async function processLineByLine() {
  const fileStream = createReadStream('./index.js');

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let lines = ''
  for await (const line of rl) {
    lines = play(line)
  }
  
  writeFileSync('./formatted_index.js', lines)
}

processLineByLine();