import fs from 'fs';
const data = fs.readFileSync('./day4/day4.txt', 'utf8');

interface spot {
    num: number,
    chosen: boolean
}

interface answerBoard {
    num: number,
    board: BingoBoard
}

class BingoBoard {
    board: Array<Array<spot>>;

    constructor(board: Array<Array<spot>>) {
        this.board = board;
    }

    chosenNumber(drawn: number) {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j].num === drawn)
                    this.board[i][j].chosen = true;
            }
        }
    }

    checkWinner(): boolean {
        let winner = false;
        for(let i = 0; i < this.board.length; i++) {
            winner = true;
            for (let j = 0; j < this.board.length; j++) {
                winner = winner && this.board[i][j].chosen;
            }
            if (winner) return true;
        }
        
        for(let i = 0; i < this.board.length; i++) {
            winner = true;
            for (let j = 0; j < this.board.length; j++) {
                winner = winner && this.board[j][i].chosen;
            }
            if (winner) return true;
        }

        return false;
    }

    sumAllLosers(): number {
        let sum = 0;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (!this.board[i][j].chosen)
                    sum += this.board[i][j].num;
            }
        }
        return sum;
    }

    /* For debugging */
    printBoard() {
        console.log("***board start***")
        for(let i = 0; i < this.board.length; i++) {
            console.log(this.board[i].map((value) => { return ((value.chosen) ? "Y" : "N") + value.num.toString() }).join(","));
        }
        console.log("***board end***")
    }
}

function day4Challenge1(): void {
    let lines = data.split("\n");
    let drawings = lines[0].split(",").map((value: string) => {return parseInt(value)});
    let bingoBoards: Array<BingoBoard> = getBoards(lines);

    let winner = getWinningBoard(drawings, bingoBoards);

    //console.log("winning num: " + winner.num);
    //console.log("sum of losers: " + winner.board.sumAllLosers());

    console.log("Day 4, Challenge 1 Answer: " + (winner.num * winner.board.sumAllLosers()));
}

function day4Challenge2(): void {
    let lines = data.split("\n");
    let drawings = lines[0].split(",").map((value: string) => {return parseInt(value)});
    let bingoBoards: Array<BingoBoard> = getBoards(lines);

    let loser = getLastBoard(drawings, bingoBoards);

    //console.log("winning num: " + loser.num);
    //console.log("sum of losers: " + (loser.board.sumAllLosers() - loser.num));

    console.log("Day 4, Challenge 2 Answer: " + (loser.num * (loser.board.sumAllLosers() - loser.num)));
}

function getWinningBoard(drawings: Array<number>, boards: Array<BingoBoard>): answerBoard {
    for (let draw of drawings) {
        for (let board of boards) {
            board.chosenNumber(draw);
            if (board.checkWinner()) return { num: draw, board: board };
        }
    }

    return { num: -1, board: new BingoBoard([[ {num: 0, chosen: false} ]]) };
}

function getLastBoard(drawings: Array<number>, boards: Array<BingoBoard>): answerBoard {
    let loserBoard = new BingoBoard([[ {num: 0, chosen: false} ]]);
    let cntLosers = 0;
    for (let draw of drawings) {
        if (cntLosers === 1)
            return { num: draw, board: loserBoard}

        cntLosers = 0;
        for (let board of boards) {
            board.chosenNumber(draw);
            if (!board.checkWinner()) {
                cntLosers++;
                loserBoard = board;
            }
        }
    }

    return { num: -1, board: new BingoBoard([[ {num: 0, chosen: false} ]]) };
}

function getBoards(lines: Array<string>): Array<BingoBoard> {
    let bingoBoards: Array<BingoBoard> = [];
    let currB: Array<Array<spot>> = [];
    let currRow: Array<spot> = [];

    for (let i = 2; i < lines.length; i++) {
        if (lines[i].length < 4) {
            bingoBoards.push(new BingoBoard(currB));
            currB = [];
        }
        else {
            for (let j = 0; j < lines[i].length; j += 3) {
                currRow.push({num: parseInt(lines[i].substring(j, j + 2)), chosen: false});
            }
            currB.push(currRow);
            currRow = [];
        }
    }
    bingoBoards.push(new BingoBoard(currB));
    currB = [];

    return bingoBoards;
}

export { day4Challenge1, day4Challenge2 }
