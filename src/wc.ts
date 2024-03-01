import { ReadStream, createReadStream } from 'fs';
import { MAX_INPUT, DASH } from './const';
import { resolve } from 'path';
import { Readable } from 'stream';


const parseArgs = (args: string[]): { option: string, infile: string } => {
  if (!args.length || args.length > MAX_INPUT) throw new Error('Invalid Arguments');
  
  let [option, infile] = args;
  
  if (option.charAt(0) !== DASH && !infile) return { option: '', infile: option };
  
  if (option.charAt(0) !== DASH && infile.charAt(0) === DASH) {
    return { option: infile, infile: option };
  }
  return { option, infile }
}

const countBytes = async (dataStream: ReadStream | Readable) => {
  const result = new Promise((resolve, reject) => {
    let nbBytes = 0;

      dataStream.on('data', (chunk) => {
        nbBytes += chunk.length;
    });

    dataStream.on('end', () => {
      resolve(nbBytes);
    });

    dataStream.on('error', (error) => {
      reject(error);
    });
  });
  return await result;
}

const countLines = async (dataStream: ReadStream | Readable) => {

  const count = (str: string, start: number): number => {
    const idx = str.indexOf("\n", start);

    if (start < idx) {
      return 1 + count(str, idx + 1);
    }
    return 0;
  }
  const result = new Promise((resolve, reject) => {
    let nbLines = 0;

    dataStream.on('data', (chunk) => {
      nbLines += count(chunk.toString(), 0);
    });

    dataStream.on('end', () => {
      resolve(nbLines);
    });

    dataStream.on('error', (error) => {
      reject(error);
    });
  });
  return await result;
}

const countWords = async (dataStream: ReadStream | Readable) => {
  const separator = " \t\n\v\f\r";
  const result = new Promise((resolve, reject) => {
    let nbWords = 0;
    let cursor = 0;
    let buffer = '';

    const count = (str: string): number => {
      let nbWords = 0;
      let i = cursor;
      while (i < str.length) {
        while (separator.includes(str[i]) && i < str.length) {
          i++;
        }
        const wordStart = i;
        while (!separator.includes(str[i]) && i < str.length) {
          i++;
        }
        const wordEnd = i;
        if (wordEnd != cursor && wordStart != cursor) nbWords++;
      }
      cursor = i;
      return nbWords;
    }

    dataStream.on('data', (chunk) => {
      buffer += chunk;
      nbWords += count(buffer);
    });

    dataStream.on('end', () => {
      resolve(nbWords);
    });

    dataStream.on('error', (error) => {
      reject(error);
    });
  });
  return await result;
}

const countCharacters = async (dataStream: ReadStream | Readable) => {
  const result = new Promise((resolve, reject) => {
    let nbChars = 0;

      dataStream.on('data', (chunk) => {
        nbChars += chunk.toString().length;
    });

    dataStream.on('end', () => {
      resolve(nbChars);
    });

    dataStream.on('error', (error) => {
      reject(error);
    });
  });

  return await result;
}

const optionsMap: {
  [key: string]: (dataStream: ReadStream | Readable) => void;
} = {
  c: countBytes,
  l: countLines,
  w: countWords,
  m: countCharacters
};
const mapOptionToFunction = (option: string): (dataStream: ReadStream | Readable) => void => {
  if (option in optionsMap) {
    return optionsMap[option];
  }
  throw new Error('Invalid option');
};

const exist = (input: string) => input !== undefined && input != '';

const reoppen = (infile: string): ReadStream | Readable  => {
  if (exist(infile)) return createReadStream(infile);
  return Readable.from(process.stdin);
}

const execDefaultOptions = async (dataStream: any, infile: string) => {
    const lines = await countLines(dataStream);
    const bytes = await countBytes(reoppen(infile));
    const words = await countWords(reoppen(infile));

    console.log(`${lines} ${words} ${bytes}  ${infile ?? ''}`);
}
export { parseArgs, mapOptionToFunction, exist, execDefaultOptions };
