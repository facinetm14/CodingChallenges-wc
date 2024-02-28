import { ReadStream } from 'typeorm/platform/PlatformTools';
import { MAX_INPUT, DASH } from './const';
import { resolve } from 'path';


const parseArgs = (args: string[]): { option: string, input: string } => {
  if (!args.length || args.length > MAX_INPUT) throw new Error('Invalid Arguments');
  
  let [option, input] = args;
  if (option.charAt(0) !== DASH && input.charAt(0) !== DASH) throw new Error('Invalid Arguments');

  if (option.charAt(0) !== DASH) {
    const tmp = option;
    option = input;
    input = tmp;
  }
  return { option, input };
}

const optionsMap: {
  [key: string]: string;
} = {
  c: 'countBytes',
  l: 'countLine',
  w: 'countWord',
  m: 'countCharacter'
};

const mapOptionToFunction = (option: string): string => {
  if (option in optionsMap) {
    return optionsMap[option];
  }
  throw new Error('Invalid option');
};

const countBytes = async (dataStream: ReadStream) => {
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

const countLine = async (dataStream: ReadStream) => {

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

const countWord = async (dataStream: ReadStream) => {
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

const countCharacter = async (dataStream: ReadStream) => {
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
const counter: {
  [key: string]: any,
} = {
  countBytes,
  countLine,
  countWord,
  countCharacter
};
export { parseArgs, mapOptionToFunction, counter };
