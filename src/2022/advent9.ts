import fs from 'fs';

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

type NumTuple = [number, number];

process.stdout.write('\u001b[3J\u001b[1J');
console.clear();
console.log('\n\n\n\n\n\n\n');

function drawGrid(grid: string[][], rope: NumTuple[]) {
    console.log('drawing grid');
    console.log(rope);
    return grid
        .map((values, index) => ({ values, yPos: index }))
        .reverse()
        .map(({ values, yPos }) => {
            const clonedRow = [...values];
            return clonedRow
                .map((z, xPos) => {
                    const isRope = rope.findIndex(([x, y]) => x === xPos && y === yPos);
                    // console.log({xPos, yPos, isRope})
                    return isRope !== -1 ? `${isRope}` : z;
                })
                .join('');
        })
        .join('\n');
}
function advent9a(input: string): number {
    const lines = input.split('\n');
    const directions = lines.map((line) => {
        const [dir, num] = line.split(' ');
        return { dir, num: parseInt(num, 10) };
    });

    console.log(directions);
    const upSum = directions.filter((d) => d.dir === 'U').reduce((acc, curr) => acc + curr.num, 0);
    const downSum = directions.filter((d) => d.dir === 'D').reduce((acc, curr) => acc + curr.num, 0);
    const leftSum = directions.filter((d) => d.dir === 'L').reduce((acc, curr) => acc + curr.num, 0);
    const rightSum = directions.filter((d) => d.dir === 'R').reduce((acc, curr) => acc + curr.num, 0);

    console.log({ upSum, downSum, leftSum, rightSum });

    const verticalPositions = directions
        .filter((d) => d.dir === 'U' || d.dir === 'D')
        .reduce(
            (acc, curr) => {
                const last = acc[acc.length - 1];
                if (curr.dir === 'U') {
                    return [...acc, last + curr.num];
                }
                if (curr.dir === 'D') {
                    return [...acc, last - curr.num];
                }
                return acc;
            },
            [0],
        );

    const horizontalPositions = directions
        .filter((d) => d.dir === 'L' || d.dir === 'R')
        .reduce(
            (acc, curr) => {
                const last = acc[acc.length - 1];
                if (curr.dir === 'R') {
                    return [...acc, last + curr.num];
                }
                if (curr.dir === 'L') {
                    return [...acc, last - curr.num];
                }
                return acc;
            },
            [0],
        );

    console.log({ verticalPositions, horizontalPositions });
    const maxVertical = Math.max(...verticalPositions);
    const minVertical = Math.min(...verticalPositions);
    const maxHorizontal = Math.max(...horizontalPositions);
    const minHorizontal = Math.min(...horizontalPositions);

    console.log({ maxVertical, minVertical, maxHorizontal, minHorizontal });

    const grid = [];
    for (let y = minVertical; y <= maxVertical; y++) {
        const row = [];
        for (let x = minHorizontal; x <= maxHorizontal; x++) {
            row.push('.');
        }
        grid.push(row);
    }

    const rope = [];
    const ropeLength = 10;
    for (let i = 0; i < ropeLength; i++) {
        rope.push([0, 0]);
    }

    const smallRopes = [];
    for (let i = 1; i < ropeLength; i++) {
        smallRopes.push([rope[i - 1], rope[i]]);
    }

    debugger;
    debugger;
    // const hPos: NumTuple = [0, 0];
    // const tPos: NumTuple = [0, 0];
    const tailVisits = new Set<string>();
    // console.log('initial grid');
    // console.log(drawGrid(grid, hPos, tPos));
    directions.forEach((d) => {
        console.log('direction', d);
        const num = d.num;
        for (let i = 0; i < num; i++) {
            if (d.dir === 'U') {
                rope[0][1]++;
            } else if (d.dir === 'D') {
                rope[0][1]--;
            } else if (d.dir === 'L') {
                rope[0][0]--;
            } else if (d.dir === 'R') {
                rope[0][0]++;
            }
            // grid[tPos[1]][tPos[0]] = 'X';
            // console.log({ hPos });
            // console.log({ tPos });

            // console.log('before');
            // console.log(drawGrid(grid, hPos, tPos));
            // console.log('\n');

            smallRopes.forEach(([hPos, tPos]) => {
                const vDist = Math.abs(hPos[1] - tPos[1]);
                const hDist = Math.abs(hPos[0] - tPos[0]);

                // console.log({ vDist, hDist });
                // move T close to H
                if (hPos[0] === tPos[0] && hPos[1] === tPos[1]) {
                    console.log('same, no move');
                } else if (hPos[0] === tPos[0] && hPos[1] !== tPos[1]) {
                    // move vertically
                    if (vDist > 1) {
                        if (hPos[1] > tPos[1]) {
                            tPos[1]++;
                        } else {
                            tPos[1]--;
                        }
                    }
                } else if (hPos[0] !== tPos[0] && hPos[1] === tPos[1]) {
                    // move horizontally
                    if (hDist > 1) {
                        if (hPos[0] > tPos[0]) {
                            tPos[0]++;
                        } else {
                            tPos[0]--;
                        }
                    }
                } else if (hPos[0] !== tPos[0] && hPos[1] !== tPos[1] && (vDist > 1 || hDist > 1)) {
                    // move diagonally
                    if (hPos[0] > tPos[0]) {
                        if (hPos[1] > tPos[1]) {
                            tPos[0]++;
                            tPos[1]++;
                        } else {
                            tPos[0]++;
                            tPos[1]--;
                        }
                    } else {
                        if (hPos[1] > tPos[1]) {
                            tPos[0]--;
                            tPos[1]++;
                        } else {
                            tPos[0]--;
                            tPos[1]--;
                        }
                    }
                }

                // console.log('after');
                // console.log(drawGrid(grid, hPos, tPos));
                // console.log('\n');
            });
            const tail = rope[rope.length - 1];
            tailVisits.add(`${tail[0]},${tail[1]}`);
        }
        // console.log(drawGrid(grid, rope));

        // console.log({hPos});
    });

    // console.log(drawGrid(grid, rope));
    console.log({ tailVisits });
    // log tail visits size
    console.log(tailVisits.size);

    return tailVisits.size;
}

// console.log(advent9a(testInput));
// console.assert(advent9a(testInput) === 13);

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

// console.log(advent9a(testInput2));
// console.log(advent9a(['U 20','R 5','D 1'].join("\n")));

const input1 = fs.readFileSync(__dirname + '/day9Input.txt', 'utf8');
const answer1 = advent9a(input1);
console.log('answer1', answer1);
