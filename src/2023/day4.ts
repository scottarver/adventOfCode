import { memoize } from 'lodash';
import { day4input } from './day4input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const testinput1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

function splitAtFirst(s: string, delimiter: string): [string, string] {
    const index = s.indexOf(delimiter);
    if (index === -1) {
        return [s, ''];
    }

    return [s.slice(0, index).trim(), s.slice(index + delimiter.length).trim()];
}
const intersection = (a: number[], b: number[]) => {
    const bSet = new Set(b);
    return a.filter((x) => bSet.has(x));
};

const points = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const numPoints = (nums: number[]) => {
    return points[nums.length];
};

const parseLineBasic = (line: string): { cardNum: number; winners: number[]; hand: number[]; numWinners: number } => {
    const [header, bothNumbers] = splitAtFirst(line, ':');
    // console.log('\n\n' + '🚀 ~ file: day4.ts:34 ~ parseLine ~ header:', header);
    const [winners, hand] = splitAtFirst(bothNumbers, '|');
    const winnersNums = winners
        .replaceAll('  ', ' ')
        .split(' ')
        .map((x) => parseInt(x, 10));
    // console.log('🚀 ~ file: day4.ts:40 ~ parseLine ~ winnersNums:', winnersNums);
    const handNums = hand
        .replaceAll('  ', ' ')
        .split(' ')
        .map((x) => parseInt(x, 10));
    // console.log('🚀 ~ file: day4.ts:41 ~ parseLine ~ handNums:', handNums);
    const handWinners = intersection(handNums, winnersNums);
    // console.log('🚀 ~ file: day4.ts:39 ~ parseLine ~ handWinners:', handWinners);
    const numberOfWinners = handWinners.length;
    // console.log('🚀 ~ file: day4.ts:46 ~ parseLine ~ numberOfWinners:', numberOfWinners);
    const cardNum = parseInt(/Card +(\d+)/.exec(header)?.[1], 10);
    // console.log('🚀 ~ file: day4.ts:51 ~ parseLineBasic ~ cardNum:', cardNum);
    if (isNaN(cardNum)) {
        console.log({ line, header });
        throw new Error('cardNum is NaN');
    }

    return {
        cardNum: cardNum,
        winners: winnersNums,
        hand: handNums,
        numWinners: numberOfWinners,
    };
};
const parseLine = (line: string): number => {
    const [header, bothNumbers] = splitAtFirst(line, ':');
    // console.log('\n\n' + '🚀 ~ file: day4.ts:34 ~ parseLine ~ header:', header);
    const [winners, hand] = splitAtFirst(bothNumbers, '|');
    const winnersNums = winners
        .replaceAll('  ', ' ')
        .split(' ')
        .map((x) => parseInt(x, 10));
    // console.log('🚀 ~ file: day4.ts:40 ~ parseLine ~ winnersNums:', winnersNums);
    const handNums = hand
        .replaceAll('  ', ' ')
        .split(' ')
        .map((x) => parseInt(x, 10));
    // console.log('🚀 ~ file: day4.ts:41 ~ parseLine ~ handNums:', handNums);
    const handWinners = intersection(handNums, winnersNums);
    // console.log('🚀 ~ file: day4.ts:39 ~ parseLine ~ handWinners:', handWinners);
    const numberOfWinners = handWinners.length;
    // console.log('🚀 ~ file: day4.ts:46 ~ parseLine ~ numberOfWinners:', numberOfWinners);
    return numberOfWinners;
    // const points = numPoints(handWinners);
    // // console.log('🚀 ~ file: day4.ts:40 ~ parseLine ~ points:', points);
    // return points;
};
const parseLineMemo = memoize(parseLine);

const parseLines = (lines: string[]) => {
    let playedCards = [];

    let results = [];
    const indexed = {};
    lines.forEach((line) => {
        const result = parseLineBasic(line);
        results.push(result);
        indexed[result.cardNum] = result;
        playedCards.push(result);
    });

    for (let i = 0; i < playedCards.length; i++) {
        const lookingAt = playedCards[i];
        const numWinners = lookingAt.numWinners;
        const nextCards = [...Array(numWinners).keys()].map((i) => i + 1 + lookingAt.cardNum);
        // console.log('🚀 ~ file: day4.ts:100 ~ parseLines ~ nextCards:', nextCards);
        const nextResults = nextCards.map((cardNum) => indexed[cardNum]);
        playedCards.push(...nextResults);

        console.log('on number', lookingAt.cardNum, 'new playedCards', playedCards.length);
    }
    // console.log(playedCards.length);
    return playedCards.length;

    // for (let i = 0; i < lines.length; i++) {
    //     const result = parseLineMemo(lines[i]);
    //     sum += result;
    //     // take next result lines
    //     if (result >= 0) {
    //         const next = lines.slice(i + 1, i + result + 1);
    //         console.log('next', next.length);
    //         const recursive = parseLines(next);
    //         sum += recursive;
    //     }
    // }

    //return lines.split('\n').map(parseLine);
    // return sum;
};

const run = (input: string) => {
    const lines = input.split('\n').map((x) => x.trim());
    const points = parseLines(lines);
    // const sum = lines.reduce((acc, val) => acc + val, 0);
    console.log(points);
};

run(testinput1);

run(day4input);
