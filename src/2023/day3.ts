import { unionBy } from 'lodash';
import { day3Input } from './day3Input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

type Cord = Readonly<[number, number]>;
type MaybeVal<T> = T | undefined;
type CorVal<T> = Readonly<{
    position: Cord;
    value: T;
}>;
type MaybeCorVal<T> = MaybeVal<CorVal<T>>;
type NumberOnMatrix = {
    start: Cord;
    end: Cord;
    members: CorVal<string>[];
    value: number;
};

type Matrix<T> = ReadonlyArray<ReadonlyArray<T>>;
type StringMatrix = Matrix<string>;

const splitLines = (input: string) => input.split('\n');

const get = (matrix: StringMatrix, position: Cord): MaybeCorVal<string> => {
    const [x, y] = position;
    if (x < 0 || y < 0) {
        return undefined;
    }
    if (x >= matrix.length || y >= matrix[0].length) {
        return undefined;
    }
    return {
        position: [x, y],
        value: matrix[x][y],
    };
};

const getNeighborCoords = (position: Cord): Cord[] => {
    const [x, y] = position;
    return (
        (
            [
                [x - 1, y - 1],
                [x - 1, y],
                [x - 1, y + 1],

                [x, y - 1],
                [x, y + 1],

                [x + 1, y - 1],
                [x + 1, y],
                [x + 1, y + 1],
            ] as const
        )
            // filter out negative values
            .filter(([x, y]) => x >= 0 && y >= 0)
    );
};

const notDots = (c: string | MaybeCorVal<string>) => {
    if (c === undefined) {
        return false;
    }
    if (typeof c === 'string') {
        return c !== '.';
    }
    return c.value !== '.';
};

const getBetween = (matrix: StringMatrix, start: Cord, end: Cord): MaybeCorVal<string>[] => {
    const [x1, y1] = start;
    const [x2, y2] = end;
    const xRange = x1 < x2 ? [x1, x2] : [x2, x1];
    const yRange = y1 < y2 ? [y1, y2] : [y2, y1];
    const allCoords = matrix.flatMap((row, x) => row.map((_, y) => [x, y]));
    const coords = allCoords.filter(([x, y]) => x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]);
    return coords.map(([x, y]) => get(matrix, [x, y]));
};

const getNumbers = (matrix: StringMatrix, position: Cord): NumberOnMatrix | undefined => {
    // first check that we are on a number
    const current = get(matrix, position);
    if (!current || !/\d/.test(current.value)) {
        return undefined;
    }

    // scan left until we hit a non number or the edge
    let left = position[1];
    for (let i = position[1]; i >= 0; i--) {
        const c = get(matrix, [position[0], i]);
        if (c === undefined) {
            break;
        }
        if (!/\d/.test(c.value)) {
            break;
        }
        left = i;
    }

    // scan right until we hit a non number or the edge
    let right = position[1];
    for (let i = position[1]; i < matrix[0].length; i++) {
        const c = get(matrix, [position[0], i]);
        if (c === undefined) {
            break;
        }
        if (!/\d/.test(c.value)) {
            break;
        }
        right = i;
    }

    const betweens = getBetween(matrix, [position[0], left], [position[0], right]);

    const isJustNumbers = betweens.every((c) => c?.value !== undefined && /\d/.test(c.value));
    if (!isJustNumbers) {
        return undefined;
    }
    const value = betweens
        .map((c) => c?.value)
        .filter((v) => v !== undefined)
        .join('');
    // console.log(betweens);
    return {
        start: [position[0], left],
        end: [position[0], right],
        members: betweens,
        value: parseInt(value, 10),
    };
};

// const x = getNumbers(matrix, [0, 0]);
// console.log('🚀 ~ file: day3.ts:138 ~ x:', x);

const uniques = (inputs: NumberOnMatrix[]): NumberOnMatrix[] => {
    return unionBy(inputs, (x) => `${x.start} ${x.end}`);
};
const run = (input: string) => {
    const testMatix = splitLines(input).map((line) => line.split(''));
    const allCoords = testMatix.flatMap((row, x) => row.map((_, y) => [x, y] as const));
    const symbolCords = allCoords.map((i) => get(testMatix, i)).filter((x) => notDots(x) && !/\d/.test(x.value));
    const neighbors = symbolCords.flatMap((c) => getNeighborCoords(c.position));
    const numberNeighbors = neighbors.filter((x) => /\d/.test(get(testMatix, x)?.value ?? ''));
    // console.log('🚀 ~ file: day3.ts:154 ~ numberNeighbors:', numberNeighbors);
    // console.log('🚀 ~ file: day3.ts:153 ~ neighbors:', neighbors);
    const values = uniques(numberNeighbors.map((i) => getNumbers(testMatix, i)).filter((x) => x !== undefined));
    // console.log('🚀 ~ file: day3.ts:155 ~ values:', values);
    const justNumbers = values.map((x) => x.value);
    const sum = justNumbers.reduce((acc, val) => acc + val, 0);
    console.log(sum);
    return sum;
};

const run2 = (input: string) => {
    const testMatix = splitLines(input).map((line) => line.split(''));
    const allCoords = testMatix.flatMap((row, x) => row.map((_, y) => [x, y] as const));
    const symbolCords = allCoords
        .map((i) => get(testMatix, i))
        .filter((x) => notDots(x) && !/\d/.test(x.value) && x.value === '*');
    const neighborsPairs = symbolCords
        .map((c) => {
            // console.log('🚀 ~ file: day3.ts:173 ~ neighbors ~ c:', c);
            const neighborCoords = getNeighborCoords(c.position);
            const onlyNumbers = neighborCoords.filter((x) => /\d/.test(get(testMatix, x)?.value ?? ''));
            const numbers = onlyNumbers.map((x) => getNumbers(testMatix, x)).filter((x) => x !== undefined);
            // console.log('🚀 ~ file: day3.ts:175 ~ neighbors ~ numbers:', numbers);
            const uniquesNumbers = uniques(numbers);
            // console.log('🚀 ~ file: day3.ts:178 ~ neighbors ~ uniquesNumbers:', uniquesNumbers);
            if (uniquesNumbers.length === 2) {
                return uniquesNumbers;
            }
            return [];
        })
        .filter((x) => x.length > 0);

    const multiplied = neighborsPairs.map(([a, b]) => a.value * b.value);
    const sum = multiplied.reduce((acc, val) => acc + val, 0);
    console.log('🚀 ~ file: day3.ts:191 ~ run2 ~ sum:', sum);

    return sum;
};

// run(testInput);
run2(testInput);
// run(day3Input);
run2(day3Input);

// const values = allCoords.map((i) => getNumbers(matrix, i)).filter((x) => x !== undefined);
// const uniquesValues = uniques(values);
// console.log('🚀 ~ file: day3.ts:153 ~ uniquesValues:', uniquesValues);

// console.log(getNeighborCoords([0, 0]).map(([x, y]) => get(matrix, [x, y])));
// console.log(getNeighborCoords([5, 5]).map(([x, y]) => get(matrix, [x, y])));
// console.log(
//     getNeighborCoords([5, 5])
//         .map(([x, y]) => get(matrix, [x, y]))
//         .filter(notDots),
// );
