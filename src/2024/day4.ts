
import { readFileSync } from 'fs';
import { get } from 'lodash';
const testInput1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function doDay4(input: string): number {
    const split = input.split('\n').map((x) => x.split(''));
    let counter = 0;

        const top = 0;
        const bottom = split.length - 1;
    const left = 0;
    const right = split[0].length - 1;

    const searchFor = 'XMAS';

    const getForwards = (i: number, j: number): string => {
        let result = '';
        for(let x = j; x <= right && result.length < searchFor.length; x++) {
            result += split[i][x];
        }
        return result;
    }
    const getBackwards = (i: number, j: number): string => {    
        let result = '';
        for (let x = j; x >= left && result.length < searchFor.length; x--) {
            result += split[i][x];
        }
        return result;
    }
    const getUpwards = (i: number, j: number): string => {  
        let result = '';
        for (let x = i; x >= top && result.length < searchFor.length; x--) {
            result += split[x][j];
        }
        return result;
    }
    const getDownwards = (i: number, j: number): string => {
        let result = '';
        for (let x = i; x <= bottom && result.length < searchFor.length; x++) {
            result += split[x][j];
        }
        return result;
    }
    // get diagionalUpwardsLeft
    const getDiagionalUpwardsLeft = (i: number, j: number): string => {
        let result = '';
        for (let x = i, y = j; x >= top && y >= left && result.length < searchFor.length; x--, y--) {
            result += split[x][y];
        }
        return result;
    }
    // get diagionalUpwardsRight
    const getDiagionalUpwardsRight = (i: number, j: number): string => {
        let result = '';
        for (let x = i, y = j; x >= top && y <= right && result.length < searchFor.length; x--, y++) {
            result += split[x][y];
        }
        return result;
    }

    // get diagionalDownwardsLeft
    const getDiagionalDownwardsLeft = (i: number, j: number): string => {
        let result = '';
        for (let x = i, y = j; x <= bottom && y >= left && result.length < searchFor.length; x++, y--) {
            result += split[x][y];
        }
        return result;
    }
    // get diagionalDownwardsRight
    const getDiagionalDownwardsRight = (i: number, j: number): string => {
        let result = '';
        for (let x = i, y = j; x <= bottom && y <= right && result.length < searchFor.length; x++, y++) {
            result += split[x][y];
        }
        return result;
    }

    for(let i = 0; i < split.length; i++) {
        const row = split[i];
        for(let j = 0; j < row.length; j++) {
            const cell = row[j];
            // console.log(i,j,cell);

            if (cell === 'X') {

                // search forwards
                const forwards = getForwards(i, j);
                const backwards = getBackwards(i, j);
                const upwards = getUpwards(i, j);
                const downwards = getDownwards(i, j);
                const diagionalUpwardsLeft = getDiagionalUpwardsLeft(i, j);
                const diagionalUpwardsRight = getDiagionalUpwardsRight(i, j);
                const diagionalDownwardsLeft = getDiagionalDownwardsLeft(i, j);
                const diagionalDownwardsRight = getDiagionalDownwardsRight(i, j);
                // console.log({
                //     i, j,
                //     cell,
                //     forwards,
                //     backwards,
                //     upwards,
                //     downwards,
                //     diagionalUpwardsLeft,
                //     diagionalUpwardsRight,
                //     diagionalDownwardsLeft,
                //     diagionalDownwardsRight
                // });
                const all = {
                    forwards,
                    backwards,
                    upwards,
                    downwards,
                    diagionalUpwardsLeft,
                    diagionalUpwardsRight,
                    diagionalDownwardsLeft,
                    diagionalDownwardsRight
                };
                const matches = Object.entries(all).filter(([key,value]) => value === searchFor);
                console.log({
                    i, j,
                    matches
                });
                counter += matches.length;
            }
        }
    }

    return counter;
}


function doDay4_2(input: string): number {
    const split = input.split('\n').map((x) => x.split(''));
    let counter = 0;

    for (let rowIndex = 0; rowIndex < split.length; rowIndex++) {
        const row = split[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];
            // console.log(i,j,cell);

            if (cell === 'A') {

                const getAtRelative = (i: number, j: number): string => {
                    return split[rowIndex + i]?.[colIndex + j] ?? null;
                }

                const upOneLeftOne = getAtRelative(-1,-1);
                const upOneRight1 = getAtRelative(-1, 1);
                const downOneLeftOne = getAtRelative(1, -1);
                const downOneRightOne = getAtRelative(1, 1);



                let possible = [];
                const topLeftToBottomRight = [upOneLeftOne, cell, downOneRightOne];
                const TopRightToBottomLeft = [upOneRight1, cell, downOneLeftOne];
                possible = [topLeftToBottomRight, TopRightToBottomLeft ].filter((x) => !x.includes(null));
                possible = possible.map((x) => x.sort().join(''));
                possible = possible.filter((x) => x === 'AMS');
                

                // possible = possible.map((x) => x.join(''));
                // possible = possible.filter((x) => x === 'SAM' || x === 'MAS');
                const correct = possible.length === 2;
                    console.log({
                        correct,
                        cell,
                        rowIndex,
                        colIndex,
                        topLeftToBottomRight,
                        TopRightToBottomLeft,
                        possible
                    });

                counter += correct ? 1 : 0;
            }
        }
    }

    return counter;
}
const testResult = doDay4_2(testInput1);
console.log(testResult);

// const test1Input = readFileSync('./day4input.txt', 'utf-8');
// const result = doDay4(test1Input);
// console.log(result);

const test1Input = readFileSync('./day4input.txt', 'utf-8');
const result = doDay4_2(test1Input);
console.log(result);