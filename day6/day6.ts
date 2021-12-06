import fs from 'fs';
const data = fs.readFileSync('./day6/day6.txt', 'utf8');

function day6Challenge1(): void {
    console.log("Day 6, Challenge 1 Answer: " + getFishCount(80));
}

function day6Challenge2(): void {
    console.log("Day 6, Challenge 2 Answer: " + getFishCount(256));
}

function getFishCount(maxDays: number) {
    let fishy = data.split(",").map((value) => {return parseInt(value)});
    let fishyCnt = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let fish of fishy)
        fishyCnt[fish]++;
    let fishyCopy = fishyCnt.map((x) => x);

    let days = 0;
    while(days < maxDays) {
        for (let i = 0; i < fishyCnt.length; i++)
            fishyCopy[i] = fishyCnt[i];
        for (let i = 8; i >= 0; i--)
            fishyCnt[i] = fishyCopy[i + 1];
        fishyCnt[8] = fishyCopy[0];
        fishyCnt[6] += fishyCopy[0];
        days++;
    }
    
    let sum = 0;
    for (let fish of fishyCnt)
        sum += fish;
    return sum;
}

export { day6Challenge1, day6Challenge2 }
