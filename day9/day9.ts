import fs from 'fs';
const data = fs.readFileSync('./day9/day9.txt', 'utf8');

interface Coord {
    x: number,
    y: number,
    item: number
}

function day9Challenge1(): void {
    let map = data.split("\n").map((value) => {return value.split("").map((value) => parseInt(value)).filter((value) => {return !isNaN(value)})});

    let sum = 0;

    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map[y].length; x++) {
            let lowestOfGrid = map[y][x];
            for(let i = (y !== 0) ? -1 : 0; i <= ((y !== map.length - 1) ? 1 : 0); i++) {
                for (let j = (x !== 0) ? -1 : 0; j <= ((x !== map[y].length - 1) ? 1 : 0); j++) {
                    lowestOfGrid = Math.min(lowestOfGrid, map[y + i][x + j]);
                }
            }
            if (map[y][x] === lowestOfGrid) sum += (lowestOfGrid + 1);
        }
    }

    console.log("Day 9, Challenge 1 Answer: " + sum);
}

function day9Challenge2(): void {
    let map = data.split("\n").map((value) => {return value.split("").map((value) => parseInt(value)).filter((value) => {return !isNaN(value)})});

    let rank: Array<number> = [0, 0, 0];
    
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let coords: Array<Coord> = []
            basinFinder(map, x, y, coords);

            if (coords.length > rank[0]) {
                rank.shift();
                rank.push(coords.length);
                rank = rank.sort((a: number, b: number) => a - b);
            }
        }
    }

    let answer = 1;
    for (let num of rank)
        answer *= num;

    console.log("Day 9, Challenge 2 Answer: " + answer);
}

function basinFinder(arr: Array<Array<number>>, x: number, y: number, coord: Array<Coord>){
    for(let i = 0; i < coord.length; i++) if (coord[i].x === x && coord[i].y === y) return;

    if(arr[y][x] === 9) return;

    coord.push({ x: x, y: y, item: arr[y][x]});

    if (y !== (arr.length - 1) && arr[y + 1][x] > arr[y][x])
        basinFinder(arr, x, y + 1, coord);

    if (y !== 0 && arr[y - 1][x] > arr[y][x])
        basinFinder(arr, x, y - 1, coord);

    if (x !== (arr[y].length - 1) && arr[y][x + 1] > arr[y][x])
        basinFinder(arr, x + 1, y, coord);

    if (x !== 0 && arr[y][x - 1] > arr[y][x])
        basinFinder(arr, x - 1, y, coord);
}

export { day9Challenge1, day9Challenge2 }
