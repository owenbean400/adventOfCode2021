import fs from 'fs';
const data = fs.readFileSync('./day12/day12.txt', 'utf8');

class Graph<T> {
    connection: Map<T, Array<T>>;

    constructor() {
        this.connection = new Map();
    }

    addEdge(v1: T, v2: T) {
        if(this.connection.has(v1))
            // @ts-ignore
            this.connection.get(v1).unshift(v2);
        else
            this.connection.set(v1, [v2]);

        if (this.connection.has(v2))
            // @ts-ignore
            this.connection.get(v2).unshift(v1);
        else
            this.connection.set(v2, [v1]);
    }

    addVertex(v: T) {
        if (!this.connection.has(v))
            this.connection.set(v, []);
    }
}

function day12Challenge1(): void {
    let arr: string[] = [];
    let answer: Array<Array<string>> = [];
    search1(getGraph(), arr, "start", answer);

    console.log("Day 12, Challenge 1 Answer: " + (answer.length));
}

function day12Challenge2(): void {
    let arr: string[] = [];
    let answer: Array<Array<string>> = [];
    search2(getGraph(), arr, "start", answer, false);

    console.log("Day 12, Challenge 2 Answer: " + (answer.length));
}

function getGraph(): Graph<string> {
    let stuff = data.split("\r\n").map((value) => {return value.split("-")});

    let graph: Graph<string> = new Graph();

    for (let path of stuff)
        graph.addEdge(path[1], path[0]);

    return graph;
}


function search1(graph: Graph<string>,arr: Array<string>, place: string, answer: Array<Array<string>>) {
    let copyArr: Array<string> = [...arr];

    if (place.toLowerCase() === place && copyArr.includes(place))
        return;
    
    copyArr.push(place);

    if (place === "end") {
        answer.push(copyArr);
        return;
    }

    // @ts-ignore
    for (let node of graph.connection.get(place)) {
        search1(graph, copyArr, node, answer);
    }
}

function search2(graph: Graph<string>,arr: Array<string>, place: string, answer: Array<Array<string>>, visitTwice: boolean) {
    let copyArr: Array<string> = [...arr];

    if (place.toLowerCase() === place && copyArr.includes(place)) {
        if(visitTwice) {
            return
        }
        else {
            if (place === "start" || place === "end")
                return;
            else
                visitTwice = true;
        }
    }
    
    copyArr.push(place);

    if (place === "end") {
        answer.push(copyArr);
        return;
    }

    // @ts-ignore
    for (let node of graph.connection.get(place)) {
        search2(graph, copyArr, node, answer, visitTwice);
    }
}

export { day12Challenge1, day12Challenge2 }
