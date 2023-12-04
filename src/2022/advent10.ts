import fs from 'fs';

const cycleTime = {
    addx: 2,
    noop: 1,
};

process.stdout.write('\u001b[3J\u001b[1J');
console.clear();

const peek = [20, 60, 100, 140, 180, 220];
function advent10(input: string): number {
    const lines = input.split('\n');

    let sum = 0;

    let cycle = 0;
    let XRegister = 1;
    let instructionPointer = 0;

    const screenWidth = 40;

    const screen = [] as string[][];
    let pixel = 0;
    let row = 0;
    const checkPeek = () => {
        if (peek.includes(cycle)) {
            // console.log({cycle, XRegister, instructionPointer, sum });
            // console.log({ XRegister, cycle, mul: XRegister * cycle, sum, nuwSum: sum + XRegister * cycle });
            sum += XRegister * cycle;
        }
    };

    const drawn = new Set<number>();
    const draw = () => {
        if (pixel >= screenWidth) {
            throw new Error('pixel too big');
        }
        row = Math.floor(cycle / screenWidth);
        if (!drawn.has(cycle)) {
            const pixels = [XRegister - 1, XRegister, XRegister + 1];
            let drawnLine = '';
            for (let i = 0; i < screenWidth - 1; i++) {
                if (pixels.includes(i)) {
                    drawnLine += '#';
                } else {
                    drawnLine += '.';
                }
            }
            console.log({ cycle, row, pixel, XRegister, instructionPointer, pixels });
            console.log(drawnLine);
            console.log('-----------');
            if (!screen[row]) {
                screen[row] = [];
            }

            if (pixels.includes(pixel)) {
                screen[row][pixel] = '#';
            } else {
                screen[row][pixel] = '.';
            }
            drawn.add(cycle);

            pixel++;
            if (pixel >= screenWidth) {
                pixel = 0;
            }

            console.log(screen.map((row) => row.join('')).join('\n'));
            console.log('\n');
        }
    };
    while (instructionPointer < lines.length) {
        const line = lines[instructionPointer];
        // console.log(line);
        const [instruction, value] = line.split(' ');
        const numValue = parseInt(value, 10);
        const cycles = cycleTime[instruction] || -1;
        for (let i = 0; i < cycles; i++) {
            cycle++;
            console.log({ cycle });
            checkPeek();
            draw();
        }
        if (instruction === 'addx') {
            console.log(line);
            XRegister += numValue;
            // console.log({XRegister, numValue});
        }
        instructionPointer++;
    }
    console.log(screen.map((row) => row.join('')).join('\n'));
    return sum;
}

const testInput1 = `noop
addx 3
addx -5`;

// console.log(advent10(testInput1));

const testInput2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

console.log(advent10(testInput2));

const input1 = fs.readFileSync(__dirname + '/day10Input.txt', 'utf8');
const answer1 = advent10(input1);
console.log('answer1', answer1);
