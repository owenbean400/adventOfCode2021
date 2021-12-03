import fs from 'fs';
const data = fs.readFileSync('./day3/day3.txt', 'utf8');

function day3Challenge1() {
    let bits = [];
    let bitsArr = data.split("\n").map((value: string) => {return value.split("").map((value: string) => {return parseInt(value)} ) } );

    for (let i = 0; i < bitsArr[0].length - 1; i++)
        bits.push(0);

    for(let i = 0; i < bitsArr.length; i++) {
        for (let j = 0; j < bitsArr[i].length - 1; j ++)
            bits[j] = bits[j] + bitsArr[i][j];
    }

    for(let i = 0; i < bits.length; i++) 
        bits[i] = (bits[i] > (bitsArr.length / 2)) ? 1 : 0;

    let gamma = parseInt(bits.join(""), 2);
    let epsilon = parseInt(bits.map((value) => {return (value === 1) ? 0 : 1}).join(""), 2);

    //console.log(bits);
    //console.log(gamma);
    //console.log(epsilon);

    console.log("Day 3, Challenge 1 Answer: " + (gamma * epsilon));
}

function day3Challenge2() {
    let bitsArr = data.split("\n").map((value: string) => {return value.split("").map((value: string) => {return parseInt(value)} ) } );
    
    for (let i = 0; i < bitsArr.length; i++)
        bitsArr[i].pop();

    let oxygenArr = filterOut(bitsArr, 0, true);
    let coArr = filterOut(bitsArr, 0, false);
    let oxygen = parseInt(oxygenArr[0].join(""), 2);
    let co = parseInt(coArr[0].join(""), 2);

    //console.log(oxygen);
    //console.log(co);

    console.log("Day 3, Challenge 2 Answer: " + (oxygen * co));
}

function filterOut(arr: Array<Array<number>>, p: number, isOxy: boolean): Array<Array<number>> {
    if (arr.length === 1)
        return arr;

    let cnt = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][p] === 1)
            cnt++;
    }

    let keeper = (isOxy) ? (cnt >= (arr.length / 2)) ? 1 : 0 :
                           (cnt >= (arr.length / 2)) ? 0 : 1 ;

    arr = arr.filter((value: number[]) => {
        return value[p] === keeper;
    })

    return filterOut(arr, p + 1, isOxy);
}

export { day3Challenge1, day3Challenge2 }