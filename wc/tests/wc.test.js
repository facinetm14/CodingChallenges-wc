"use strict";
import { parse } from 'path';
import { parseArgs, counter } from '../src/wc';

describe("testing parseArgs", () => {
  it("it should return -wc as option and text.txt as input when ['-c', 'text.txt']", () => {
    const args = ["-c", "text.txt"];

    const parsedArgs = parseArgs(args);

    expect(parsedArgs).toEqual({option: "-c", input: "text.txt"});
  });

  it("it should return -l as option and input.txt as input ['-c', 'text.txt']", () => {
    const args = ["input.txt", "-g"];

    const parsedArgs = parseArgs(args);

    expect(parsedArgs).toEqual({ option: "-g", input: "input.txt" });
  });
  
  it("should throw error when ['-c', 'input', 'wrong']", () => {
    const args = ["-c", "-input", "wrong"];

    const wrapper = () => parseArgs(args);

    expect(wrapper).toThrow();
  });
});