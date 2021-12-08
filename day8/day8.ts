import fs from 'fs';
const data = fs.readFileSync('./day8/day8.txt', 'utf8');

interface D {
    before: Array<string>,
    after: Array<string>
}

function day8Challenge1(): void {
    let afterD = data.split("\n").map((value) => {return value.split("|")[1].substring(1, value.split("|")[1].length - 1).split(" ")});
    const magicL = [2,3,4,7];

    let cnt = 0;
    for (let i = 0; i < afterD.length; i++) {
        for (let j = 0; j < afterD[i].length; j++) {
            if (magicL.includes(afterD[i][j].length)) {
                cnt++;
            }
        }
    }

    console.log("Day 8, Challenge 1 Answer: " + cnt);
}

function day8Challenge2(): void {
    let d: Array<D> = data.split("\n").map((value) => {
        return {
            before: value.split("|")[0].substring(0, value.split("|")[0].length - 1).split(" "),
            after: value.split("|")[1].substring(1, value.split("|")[1].length - 1).split(" ")
        } 
    });

    let cnt = 0;
    for(let t of d) {
        let stringMap = getMapOfNum(t.before);
        let strNum = "";
        for (let i = 0; i < t.after.length; i++) {
            // @ts-ignore
            strNum += stringMap.get(sortStr(t.after[i])).toString();
        }
        cnt += parseInt(strNum);
    }

    console.log("Day 8, Challenge 2 Answer: " + cnt);
}

function sortStr(s: string) {
    return s.split("").sort((a, b) => a.localeCompare(b)).join("");
}

function getMapOfNum(sArr: Array<string>) {
    let mappy: Map<number, string> = new Map();

    /* get 1, 4, 7, 8 */
    let leftOver = [];
    for(let i = 0; i < sArr.length; i++) {
        switch(sArr[i].length) {
            case 2:
                mappy.set(1, sortStr(sArr[i]));
                break;
            case 3:
                mappy.set(7, sortStr(sArr[i]));
                break;
            case 4:
                mappy.set(4, sortStr(sArr[i]));
                break;
            case 7:
                mappy.set(8, sortStr(sArr[i]));
                break;
            default:
                leftOver.push(sortStr(sArr[i]));
                break;
        }
    }

    /* get 9, 3, and 0 */
    let contains = [];
    // @ts-ignore
    let oneChars = mappy.get(1).split("");
    for (let i = 0; i < leftOver.length; i++) {
        let doesContains = true;
        for (let j = 0; j < oneChars.length; j++) {
            doesContains = doesContains && leftOver[i].includes(oneChars[j]);
        }
        if(doesContains) contains.push(leftOver[i]);
    }

    // @ts-ignore
    let fourChars = mappy.get(4).split("");
    for(let i = 0; i < contains.length; i++) {
        let doesContains = true;
        for (let j = 0; j < fourChars.length; j++) {
            doesContains = doesContains && contains[i].includes(fourChars[j]);
        }
        if(doesContains) {
            mappy.set(9, contains[i]);
        }
        else {
            if(contains[i].length === 6) {
                mappy.set(0, contains[i]);
            }
            else {
                mappy.set(3, contains[i]);
            }
        }
    }

    /* find 6 */
    let lastToCheck = [];
    for (let i = 0; i < leftOver.length; i++) {
        if (leftOver[i].length === 6) {
            if (leftOver[i] != mappy.get(9) && leftOver[i] != mappy.get(0)) {
                mappy.set(6, leftOver[i]);
            }
        } else if (leftOver[i].length === 5) {
            if(leftOver[i] != mappy.get(3)) {
                lastToCheck.push(leftOver[i]);
            }
        }
    }

    // @ts-ignore
    let sixChars = mappy.get(6).split("");
    for (let i = 0; i < lastToCheck.length; i++) {
        let doesContains = true;
        for (let j = 0; j < lastToCheck[i].length; j++) {
            doesContains = doesContains && sixChars.includes(lastToCheck[i].charAt(j));
        }
        if(doesContains) {
            mappy.set(5, lastToCheck[i]);
        } else {
            mappy.set(2, lastToCheck[i]);
        }
    }
    
    let trueMap: Map<string, number> = new Map()
    for (let i = 0; i <= 9; i++) {
        // @ts-ignore
        trueMap.set(mappy.get(i), i);
    }

    return trueMap;
}

export { day8Challenge1, day8Challenge2 }
