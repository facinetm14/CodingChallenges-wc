import { readFile } from 'fs/promises';

const args: string[] = process.argv.slice(2);
console.log(`FILENAME: ${args.length}`);

const run = async () => {
    try {
      const data = await readFile(args[0], 'utf8');
      console.log(data);
  }
  catch (error) {
      console.log(error);
  }
}

run();