"use strict";
import { parse } from 'path';
import { parseArgs, counter } from '../src/wc';

describe("testing parseArgs", () => {
  it("it should return -wc as option and text.txt as infile when ['-c', 'text.txt']", () => {
    const args = ["-c", "text.txt"];

    const parsedArgs = parseArgs(args);

    expect(parsedArgs).toEqual({option: "-c", infile: "text.txt"});
  });

  it("it should return -l as option and infile.txt as infile ['-c', 'text.txt']", () => {
    const args = ["infile.txt", "-g"];

    const parsedArgs = parseArgs(args);

    expect(parsedArgs).toEqual({ option: "-g", infile: "infile.txt" });
  });
  
  it("should throw error when ['-c', 'infile', 'wrong']", () => {
    const args = ["-c", "-infile", "wrong"];

    const wrapper = () => parseArgs(args);

    expect(wrapper).toThrow();
  });
});