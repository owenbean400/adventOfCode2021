import fs from 'fs';
const data = fs.readFileSync('./day1/day1.txt', 'utf8');

function day1Challenge1(): void {
    let nums: Array<number> = data.split("\n").map((str: string) => {return parseInt(str)});
    let increaseCnt = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] > 0)
            increaseCnt++;
    }
    console.log("Day 1, Challenge 1 Answer: " + increaseCnt.toString());
}

function day1Challenge2(): void {
    let nums: Array<number> = data.split("\n").map((str: string) => {return parseInt(str)});
    let increaseCnt = 0;
    for (let i = 3; i < nums.length; i++) {
        let m = nums[i - 1] + nums[i - 2];
        if ((nums[i] + m) - (m + nums[i - 3]) > 0)
            increaseCnt++;
    }
    
    console.log("Day 1, Challenge 2 Answer: " + increaseCnt.toString());
}

export { day1Challenge1, day1Challenge2 }
