import fs from 'fs';
const data = fs.readFileSync('./day10/day10.txt', 'utf8');

function day10Challenge1(): void {
    let line = data.split("\n");
    const OPEN_SYM = ["(", "[", "{", "<"];
    const CLOSE_SYM = [")", "]", "}", ">"];
    let illegals = [];

    for(let i = 0; i < line.length; i++) {
        let symbols = line[i].split("");
        let stack: Array<string> = [];
        for (let j = 0; j < symbols.length; j++) {
            if (OPEN_SYM.includes(symbols[j])) {
                stack.unshift(symbols[j]);
            }
            else if(CLOSE_SYM.includes(symbols[j])) {
                let check = stack.shift();
                if (check !== undefined && OPEN_SYM.indexOf(check) !== CLOSE_SYM.indexOf(symbols[j])) {
                    illegals.push(symbols[j]);
                    break;
                }
            }
        }
    }

    let sum = 0;
    for (let illegal of illegals) {
        switch (illegal) {
            case ")":
                sum += 3;
                break;
            case "]":
                sum += 57;
                break;
            case "}":
                sum += 1197;
                break;
            case ">":
                sum += 25137;
                break;
        }
    }

    console.log("Day 10, Challenge 1 Answer: " + sum);
}

function day10Challenge2(): void {
    let line = data.split("\n");
    const OPEN_SYM = ["(", "[", "{", "<"];
    const CLOSE_SYM = [")", "]", "}", ">"];
    let missings = [];

    for(let i = 0; i < line.length; i++) {
        let symbols = line[i].split("");
        let stack: Array<string> = [];
        let isClean = true;
        for (let j = 0; j < symbols.length; j++) {
            if (OPEN_SYM.includes(symbols[j])) {
                stack.unshift(symbols[j]);
            }
            else if(CLOSE_SYM.includes(symbols[j])) {
                let check = stack.shift();
                if (check !== undefined && OPEN_SYM.indexOf(check) !== CLOSE_SYM.indexOf(symbols[j])) {
                    isClean = false;
                    break;
                }
            }
        }
        if (isClean)
            missings.push(stack);
    }

    let scores: Array<number> = [];
    for (let i = 0; i < missings.length; i++) {
        let score: number = 0;
        for (let c of missings[i]) {
            score *= 5;
            switch (c) {
                case "(":
                    score += 1;
                    break;
                case "[":
                    score += 2;
                    break;
                case "{":
                    score += 3;
                    break;
                case "<":
                    score += 4;
                    break;
            }
        }
        scores.push(score);
    }

    console.log("Day 10, Challenge 2 Answer: " + scores.sort((a: number, b: number) => a - b)[Math.floor(scores.length / 2)]);
}

export { day10Challenge1, day10Challenge2 }
