
import { readFileSync } from 'fs';
const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

function runDay3(input: string): number {
  const split = input.split('');
    const fixed = [];
    
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const dontRegex = /don\'t\(\)/g;
    const doRegex = /do\(\)/g;

    // using nonCapturing groups
    const validRegex = new RegExp(`(?:${mulRegex.source})|(?:${dontRegex.source})|(?:${doRegex.source})`, 'g');


    const matches = [...input.matchAll(validRegex)];

    let enabled = true;
    const vals = [];
    matches.forEach((x) => {

        console.log(x[0]);
        if (x[0].startsWith('do')) {
            enabled = true;
        }
        if (x[0].startsWith('don')) {  
            enabled = false;
        }
        console.log(enabled? 'enabled': 'disabled');
        if (!enabled) {
            return 0;
        }

        if (x[0].startsWith('mul')) {
        


            // console.log(x[1], x[2]);
            const result = parseInt(x[1], 10) * parseInt(x[2], 10);
            console.log(result);
            vals.push(result);
        }
    });
    return vals.reduce((acc, curr) => acc + curr, 0);


    // console.log(matches);


    // const minLength = 9;
    // const maxLength = 12;

    // for (let i = 0; i < split.length; i++) {

    //     const lookAt = split.slice(i, i + maxLength).join('');
    //     console.log(lookAt);


    // }
}


console.log("Day 3");
console.log("test");
const result = runDay3(testInput);
console.log(result);

const test2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const result2 = runDay3(test2);
console.log(result2);

console.log("\n\nactual")
const day3input = readFileSync('./day3input.txt', 'utf-8');
const result3 = runDay3(day3input); 
console.log(result3);