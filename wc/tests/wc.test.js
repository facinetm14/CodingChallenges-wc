"use strict";
import { parse } from 'path';
import { parseArgs, counter, countStrBySeparator } from '../src/wc';

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

describe('testing countStrBySeparator', () => {
  it('should return 3 when data="line1\nline2\nline3\n"', () => {
    const data = "line1\nline2\nline3\n";
    
    const lines = countStrBySeparator(data, 0, "\n");

    expect(lines).toBe(3);
  });
});