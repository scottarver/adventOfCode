
import day1Input from './day1_intput_1';

const dat1TestInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

function runDay1(input: string): void {
    const parseLine = (line: string): [number, number] => {
        // use regex to match any number of spaces
        const match = line.match(/(\d+)\s+(\d+)/);
        if (!match) {
            throw new Error(`Invalid line: ${line}`);
        }
        return [parseInt(match[1], 10), parseInt(match[2], 10)];
    }
    const input1Parsed = input.split('\n').map((line) => parseLine(line));

    const column1 = input1Parsed.map(([x, _]) => x);
    const column2 = input1Parsed.map(([_, y]) => y);

    const column1Sorted = column1.sort((a, b) => a - b);
    const column2Sorted = column2.sort((a, b) => a - b);

    const columnsZipped = column1Sorted.map((_, i) => [column1Sorted[i], column2Sorted[i]]);


    const distances = columnsZipped.map(([x, y]) => Math.abs(x - y));
    const summed1 = distances.reduce((acc, curr) => acc + curr, 0);
    console.log(summed1);


    const similarities = column1Sorted.map(i => {
        const matching = column2.filter(x => x === i);
        return matching.length * i;
    });

    const summed2 = similarities.reduce((acc, curr) => acc + curr, 0);
    console.log(similarities);
    console.log(summed2);



}

console.log("Day 1");
console.log("test");
runDay1(dat1TestInput);

console.log("\n\nactual")

runDay1(day1Input);
