import fs from 'fs';
const data = fs.readFileSync('./day11/day11.txt', 'utf8');

interface flash {
    num: number,
    flashes: number,
    flashed: boolean,
}

function day11Challenge1(): void {
    let nums = data.split("\n").map((value) => {return value.split("").map((value) => {return {num: parseInt(value), flashes: 0, flashed: false}}).filter((value) => !isNaN(value.num))});

    let steps = 0;
    let cnt = 0;

    while(steps < 100) {
        let isFlashing = false;
        for (let x = 0; x < nums.length; x++) {
            for (let y = 0; y < nums.length; y++) {
                nums[x][y].num += 1;
                if(nums[x][y].num > 9) {
                    flash(nums, x, y);
                    isFlashing = true;
                }
            }
        }

        while(isFlashing) {
            isFlashing = false;
            for (let x = 0; x < nums.length; x++) {
                for (let y = 0; y < nums.length; y++) {
                    nums[x][y].num += nums[x][y].flashes;
                    if (nums[x][y].num > 9 && !nums[x][y].flashed) {
                        flash(nums, x, y);
                        isFlashing = true;
                    }
                }
            }
        }

        for (let x = 0; x < nums.length; x++) {
            for (let y = 0; y < nums.length; y++) {
                nums[x][y].flashes = 0;
                if (nums[x][y].flashed) {
                    cnt++;
                    nums[x][y].num = 0;
                    nums[x][y].flashed = false;
                }
            }
        }

        steps++;
    }
    console.log("Day 11, Challenge 1 Answer: " + cnt);
}

function day11Challenge2(): void {
    
    let nums = data.split("\n").map((value) => {return value.split("").map((value) => {return {num: parseInt(value), flashes: 0, flashed: false}}).filter((value) => !isNaN(value.num))});

    let steps = 0;
    let cnt = 0;

    let t = false;
    while(!t && steps < 10000) {
        let isFlashing = false;
        for (let x = 0; x < nums.length; x++) {
            for (let y = 0; y < nums.length; y++) {
                nums[x][y].num += 1;
                if(nums[x][y].num > 9) {
                    flash(nums, x, y);
                    isFlashing = true;
                }
            }
        }

        while(isFlashing) {
            isFlashing = false;
            for (let x = 0; x < nums.length; x++) {
                for (let y = 0; y < nums.length; y++) {
                    nums[x][y].num += nums[x][y].flashes;
                    if (nums[x][y].num > 9 && !nums[x][y].flashed) {
                        flash(nums, x, y);
                        isFlashing = true;
                    }
                }
            }
        }

        for (let x = 0; x < nums.length; x++) {
            for (let y = 0; y < nums.length; y++) {
                nums[x][y].flashes = 0;
                if (nums[x][y].flashed) {
                    cnt++;
                    nums[x][y].num = 0;
                    nums[x][y].flashed = false;
                }
            }
        }

        t = true;
        for (let x = 0; x < nums.length; x++)
            t = t && nums[x].map((value) => {return value.num}).join("") === "0000000000";
        steps++;
    }

    console.log("Day 11, Challenge 2 Answer: " + steps);
}

function flash(nums: Array<Array<flash>>, x: number, y: number){
    for(let i = (x !== 0) ? -1 : 0; i <= ((x !== nums.length - 1) ? 1 : 0); i++) {
        for (let j = (y !== 0) ? -1 : 0; j <= ((y !== nums[x].length - 1) ? 1 : 0); j++) {
            nums[x + i][y + j].num += 1;
        }
    }
    nums[x][y].flashed = true;
}

export { day11Challenge1, day11Challenge2 }
