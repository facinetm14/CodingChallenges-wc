import { createReadStream } from 'fs';
import { MAX_INPUT, DASH } from './const';
import { parseArgs, mapOptionToFunction, execDefaultOptions, exist } from './wc';
import { Readable } from 'stream';

// excluding the command to run the prog : node dist/index.js
const args: string[] = process.argv.slice(2);

const run = async (args: string[]) => {
  const { option, infile } = parseArgs(args);
  try {
    let dataStream;

    if (exist(infile)) dataStream = createReadStream(infile);
    else dataStream = Readable.from(process.stdin);

    if (exist(option)) {
      const optionFunction = mapOptionToFunction(option.substring(1));
      const result = await optionFunction(dataStream);

      console.log(`${result}  ${infile ?? ''}`);
      return;
    }
    await execDefaultOptions(dataStream, infile);
  }
  catch (error) {
      console.log(error);
  }
}

run(args);