import fs from 'fs';
import chalk from 'chalk';

process.stdout.write('\u001b[3J\u001b[1J');
console.clear();
console.log('\n\n\n\n\n\n\n');

const makeArray = (start: number, end: number): number[] => {
    const result = [];

    if(start < end){
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
    }else{
        for (let i = start; i >= end; i--) {
            result.push(i);
        }
    }
    return result;
};

const customTake = (arr: number[], value: number) => {
    let shorter = 0;
    for(let j = 0; j < arr.length; j++){
        if(arr[j] < value){
            shorter++;
        }
        if(arr[j] >= value){
            shorter++;
            break;
        }
    }
    return shorter;
}


function advent8(input: string) {
    const lines = input.split('\n');
    const grid = lines.filter(l => l.trim() !== '').map((line) => line.split('').map((c) => parseInt(c, 10)));
    const width = grid[0].length;
    const height = grid.length;
    console.log(grid)

    // const visibleAroundEdge = width * 2 + height * 2 - 4;
    // console.log('visibleAroundEdge', visibleAroundEdge);
    const visibleInside = [];

    const printLines = [];
    const viewingScores = [];
    for (let y = 0; y < height; y++) {
        const printLine = [];
            for (let x = 0; x < width; x++) {
            const value = grid[y][x];
            console.log({ x, y, value });

            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                console.log('edge');
                printLine.push(chalk.bgGreen(value));
                visibleInside.push(value);
                // console.log('printLine', printLine.join(''));
                continue;
            }



            // from top
            const fromTop = makeArray(0, y - 1).map((i) => grid[i][x]);
            const fromBottom = makeArray(y + 1, height - 1).map((i) => grid[i][x]);
            const fromLeft = makeArray(0, x - 1).map((i) => grid[y][i]);
            const fromRight = makeArray(x + 1, width - 1).map((i) => grid[y][i]);

            // console.log({ fromTop, fromBottom, fromLeft, fromRight });
            const visibleFromTop = fromTop.every((v) => v < value);
            const visibleFromBottom = fromBottom.every((v) => v < value);
            const visibleFromLeft = fromLeft.every((v) => v < value);
            const visibleFromRight = fromRight.every((v) => v < value);

            console.log({ visibleFromTop, visibleFromBottom, visibleFromLeft, visibleFromRight });
            if (visibleFromTop || visibleFromBottom || visibleFromLeft || visibleFromRight) {
                visibleInside.push(value);
                printLine.push(chalk.bgGreen(value));
            }else{
                printLine.push(chalk.bgGray(value));
            }

            const toTop = makeArray(y-1,0).map((i) => grid[i][x]);
            const toBottom = makeArray(y+1,height-1).map((i) => grid[i][x]);
            const toLeft = makeArray(x-1,0).map((i) => grid[y][i]);
            const toRight = makeArray(x+1,width-1).map((i) => grid[y][i]);


            const topVisibility = customTake(toTop, value);
            const bottomVisibility = customTake(toBottom, value);
            const leftVisibility = customTake(toLeft, value);
            const rightVisibility = customTake(toRight, value);

            const viewingScore = topVisibility * bottomVisibility * leftVisibility * rightVisibility;
            // console.log({x,y,value,toTop, toBottom, toLeft, toRight, topVisibility, bottomVisibility, leftVisibility, rightVisibility, viewingScore});
                viewingScores.push(viewingScore);
        }
        printLines.push(printLine.join(''));
    }

    printLines.forEach((line) => console.log(line));

    // console.log('visibleAroundEdge',   visibleAroundEdge);
    console.log('visibleInside', visibleInside);

    console.log("maxViewingScore", Math.max(...viewingScores));
    return visibleInside.length;
}

const testInput1 = `30373
25512
65332
33549
35390`;

const test1Result = advent8(testInput1);
console.log('test1Result', test1Result);
console.assert(test1Result === 21);

const tests = [];
tests.push({
    input:'111\n111\n111',
    expected: 8,
});
tests.push({
    input:'111\n121\n111',
    expected: 9,
});
tests.push({
    input:'111\n111\n111\n111',
    expected: 10,
});
tests.push({
    input:'111\n111\n111\n111\n111',
    expected: 12,
});

// tests.forEach((test, i) => {
//     const result = advent8(test.input);
//     console.log('result'+i, result);
//     console.assert(result === test.expected);
//     if(result !== test.expected){
//         throw new Error('test failed');
//     }
// });

// read from day8input.txt
const input1 = fs.readFileSync(__dirname + '/day8Input.txt', 'utf8');
const answer1 = advent8(input1);
console.log('answer1', answer1);
// not 15879
