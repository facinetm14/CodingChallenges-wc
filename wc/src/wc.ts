import { MAX_INPUT, DASH } from './const';

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
  w: 'countWord',
  l: 'countLine'
};

const mapOptionToFunction = (option: string): string => {
  if (option in optionsMap) {
    return optionsMap[option];
  }
  throw new Error('Invalid option');
};

const countBytes = (data: string) => {
  return data.length;
}

const countLine = (data: string) => {
  return data.split('\n').filter((el: string) => el != "").length;
}

const counter: {
  [key: string]: any,
} = {
  countBytes: countBytes,
  countLine: countLine
};
export { parseArgs, mapOptionToFunction, counter };
