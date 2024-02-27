import { readFile } from 'fs/promises';
import { MAX_INPUT, DASH } from './const';
import { parseArgs, mapOptionToFunction, counter } from './wc';

// excluding the command to run the prog : node dist/index.js
const args: string[] = process.argv.slice(2);

const run = async () => {
  const { option, input } = parseArgs(args);
  try {
    const data = await readFile(input);
    const optionFunction = mapOptionToFunction(option.substring(1));  
    console.log(counter[optionFunction](data.toString()));
  }
  catch (error) {
      console.log(error);
  }
}

run();