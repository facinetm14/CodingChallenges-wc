# CodingChallenges-Wc
This project consists of building a program simulating wc command.<br/>
Thanks🙏 to <a href="https://www.linkedin.com/in/johncrickett/">John Crickett</a> ! It's one of his coding challenges helping software engineers to improve their skills.</br>
You can find more about the challenges here👉 <a href="https://codingchallenges.fyi/challenges/challenge-wc">https://codingchallenges.fyi/challenges/challenge-wc/</a>

## Technos:
- Typescript : programming language
- jest: for testing

## Supported options
  - c : number of bytes
  - l : number of lines
  - m : number of characters
  - w: number of words

## Run
- Go to the root of the repo and type ``` npm run build ``` to build
- Type ``` chmod +x ccwc.sh ``` to give execution access to ccwc (codingchallenges wc is a simple script I created to easily run the program, feel free to ```cat ccwc.sh```)
- Bingo ! now we're ready to enjoy our own wc like so : ``` ./ccwc.sh -option infile Or ./ccwc.sh infile -option```
- No infile ? Ok, you can pipe (our wc will take input from stdin).
- Example : ```./ccwc.sh -l data/text.txt // output : 7145 data/text.txt ```
  PS: Groupping options, comming soon.
  
## Outcome
Through this project, I practiced reading file content as stream with nodejs (https://nodejs.org/api/stream.html) which is very important while processing a big files.<br/>
Another alternative for processing files in to use ``` fs.readFile(path, mode) ``` slower because it reads all content at once, more suitable for small files.

## Feedback
Any feedback ? Yes, please🙂 

## Let's connect
- https://www.linkedin.com/in/facinetkouyate/
- https://github.com/facinetm14
