import fs from 'fs';
const data = fs.readFileSync('./day7/day7.txt', 'utf8');

function day7Challenge1(): void {
    let hPos = data.split(",").map((value) => {return parseInt(value)});

    let max = 0;
    let sum = 0;
    for (let num of hPos) {
        max = Math.max(max, num);
        sum += num;
    }

    let least = sum;
    for (let i = 1; i < max; i++) {
        let su = 0;
        for (let j = 0; j < hPos.length; j++) {
            su += Math.abs(hPos[j] - i);
            if (su > least)
                break;
        }
        if (least > su)
            least = su;
    }

    console.log("Day 7, Challenge 1 Answer: " + least);
}

function day7Challenge2(): void {
    let hPos = data.split(",").map((value) => {return parseInt(value)});

    let max = 0;
    for (let num of hPos)
        max = Math.max(max, num);

    let least = 0;
    for (let i = 0; i < max; i++) {
        let su = 0;
        for (let j = 0; j < hPos.length; j++) {
            su += cost(Math.abs(hPos[j] - i));
            if (i != 0 && su > least)
                break;
        }
        if (least > su)
            least = su;
        else if (i === 0)
            least = su;
    }

    console.log("Day 7, Challenge 2 Answer: " + least);
}

function cost(d: number): number {
    let sum = 0;
    for(let i = 1; i <= d; i++)
        sum += i;
    return sum;
}

export { day7Challenge1, day7Challenge2 }
