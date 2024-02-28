import { createReadStream } from 'fs';
import { MAX_INPUT, DASH } from './const';
import { parseArgs, mapOptionToFunction, counter } from './wc';

// excluding the command to run the prog : node dist/index.js
const args: string[] = process.argv.slice(2);

const run = async () => {
  const { option, input } = parseArgs(args);
  try {
    const optionFunction = mapOptionToFunction(option.substring(1));
    const dataStream = createReadStream(input);
    const result = await counter[optionFunction](dataStream);
    console.log(result);
  }
  catch (error) {
      console.log(error);
  }
}

run();