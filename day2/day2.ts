import fs from 'fs';
const data = fs.readFileSync('./day2/day2.txt', 'utf8');

interface positionI {
    x: number,
    y: number,
    aim: number
}

interface commandI {
    direction: string
    distance: number
}

function day2Challenge1() {
    let position: positionI = { x: 0, y: 0, aim: 0 }
    let commands = getCommandNeatly();

    commands.forEach((value: commandI) => {
        switch(value.direction) {
            case "forward":
                position.x = position.x + value.distance; 
                break;
            case "up":
                position.y = position.y - value.distance;
                break;
            case "down":
                position.y = position.y + value.distance;
                break;
        }
    })

    //console.log("position x: " + position.x + " position y: " + position.y);
    console.log("Day 2, Challenge 1 Answer: " + (position.x * position.y));
}

function day2Challenge2() {
    let position: positionI = { x: 0, y: 0, aim: 0 }
    let commands = getCommandNeatly();

    commands.forEach((value: commandI) => {
        switch(value.direction) {
            case "forward":
                position.x = position.x + value.distance;
                position.y = position.y + (position.aim * value.distance);
                break;
            case "up":
                position.aim = position.aim - value.distance;
                break;
            case "down":
                position.aim = position.aim + value.distance;
                break;
        }
    })

    //console.log("position x: " + position.x + " position y: " + position.y);
    console.log("Day 2, Challenge 2 Answer: " + (position.x * position.y));
}

function getCommandNeatly(): Array<commandI> {
    return data.split("\n").map((value: string): commandI => {
        let item = value.split(" ");
        return {direction: item[0], distance: parseInt(item[1])};
    });
}

export { day2Challenge1, day2Challenge2 }