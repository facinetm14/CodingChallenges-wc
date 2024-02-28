import { ReadStream, createReadStream } from 'fs';
import { MAX_INPUT, DASH } from './const';
import { parseArgs, mapOptionToFunction, counter } from './wc';
import { Readable } from 'stream';

// excluding the command to run the prog : node dist/index.js
const exist = (input: string) => input !== undefined && input != '';

const reoppen = (infile: string) => {
  if (exist(infile)) return createReadStream(infile);
  return Readable.from(process.stdin);
}
const args: string[] = process.argv.slice(2);

const run = async () => {
  const { option, infile } = parseArgs(args);
  try {
    let dataStream;
    if (exist(infile)) dataStream = createReadStream(infile);
    else dataStream = Readable.from(process.stdin);
    if (exist(option)) {
      const optionFunction = mapOptionToFunction(option.substring(1));
      const result = await counter[optionFunction](dataStream);
      console.log(`${result}  ${infile ?? ''}`);
      return;
    }
    const lines = await counter['countLines'](dataStream);
    const bytes = await counter['countBytes'](reoppen(infile));
    const words = await counter['countWords'](reoppen(infile));

    console.log(`${lines} ${words} ${bytes}  ${infile ?? ''}`);
  }
  catch (error) {
      console.log(error);
  }
}

run();