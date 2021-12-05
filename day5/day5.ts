import fs from 'fs';
const data = fs.readFileSync('./day5/day5.txt', 'utf8');

interface Cord {
    x: number,
    y: number
}

interface DataStuff {
    lines: Array<Line>,
    xMax: number,
    yMax: number
}

class Line {
    coord1: Cord
    coord2: Cord
    slope: number

    constructor(c1: Cord, c2: Cord) {
        if (c1.x <= c2.x) {
            this.coord1 = c1;
            this.coord2 = c2;
        }
        else {
            this.coord2 = c1;
            this.coord1 = c2;
        }
        if (!this.isVerticalLine())
            this.slope = (this.coord2.y - this.coord1.y) / (this.coord2.x - this.coord1.x);
        else this.slope = 0;
    }

    isVerticalLine(): boolean {
        return this.coord1.x === this.coord2.x;
    }

    isHorizontalLine() {
        return this.coord1.y === this.coord2.y;
    }
}

class Grid {
    grid: Array<Array<number>>;

    constructor(xMax: number, yMax: number) {
        this.grid = [];
        for (let y = 0; y < yMax; y++)
            this.grid.push(new Array(xMax).fill(0));
    }

    addToFill(l: Line, isAddDiagonal: boolean) {
        if (l.isVerticalLine())
            this.fillVertical(l.coord1.x, Math.min(l.coord1.y, l.coord2.y), Math.max(l.coord1.y, l.coord2.y));
        else if (l.isHorizontalLine())
            this.fillHorizontal(l.coord1.y, Math.min(l.coord1.x, l.coord2.x), Math.max(l.coord1.x, l.coord2.x));
        else if (isAddDiagonal)
            this.fillDiagonal(l);
    }

    fillVertical(x: number, y1: number, y2: number) {
        for (let y = y1; y <= y2; y++)
            this.grid[y][x] += 1;
    }

    fillHorizontal(y: number, x1: number, x2: number) {
        for (let x = x1; x <= x2; x++)
            this.grid[y][x] += 1;
    }

    fillDiagonal(l: Line) {
        let y = l.coord1.y;
        for (let x = l.coord1.x; x <= l.coord2.x; x++, (l.slope > 0) ? y++ : y--)
            this.grid[y][x] += 1;
    }

    cntAllGRTwo(): number {
        let cnt = 0;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] >= 2) cnt++;
            }
        }
        return cnt;
    }

    print() {
        for (let y = 0; y < this.grid.length; y++)
            console.log(this.grid[y].join(","));
    }
}

function day5Challenge1(): void {
    let info = getData();

    let gridy = new Grid(++info.xMax, ++info.yMax);

    for (let l of info.lines)
        gridy.addToFill(l, false);

    console.log("Day 5, Challenge 1 Answer: " + gridy.cntAllGRTwo());
}

function day5Challenge2(): void {
    let info = getData();

    let gridy = new Grid(++info.xMax, ++info.yMax);

    for (let l of info.lines)
        gridy.addToFill(l, true);

    console.log("Day 5, Challenge 2 Answer: " + gridy.cntAllGRTwo());
}

function getData(): DataStuff {
    let readLine = data.split("\n");
    let lines: Array<Line> = [];

    let max = [0, 0];
    for (let i = 0; i < readLine.length; i++) {
        let twoCords = readLine[i].split(" -> ");
        let coordOne = twoCords[0].split(",").map((value) => {return parseInt(value)});
        let coordTwo = twoCords[1].split(",").map((value) => {return parseInt(value)});
        max[0] = Math.max(max[0], coordOne[0], coordTwo[0]);
        max[1] = Math.max(max[1], coordOne[1], coordTwo[1]);
        lines.push(new Line({ x: coordOne[0], y: coordOne[1] }, { x: coordTwo[0], y: coordTwo[1] }));
    }

    return { lines: lines, xMax: max[0], yMax: max[1] };
}

export { day5Challenge1, day5Challenge2 }
