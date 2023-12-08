import { orderBy, sortBy } from 'lodash';
import { day7Input } from './day7Input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const assert = (condition: boolean, message: string) => {
    if (!condition) {
        console.error(message);
        // throw new Error(message);
    }
};

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
const cardRank = {
    A: 14,
    K: 13,
    Q: 12,
    J: 1,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
};
type Hand = Card[];
const distinct = (hand: Hand) => [...new Set(hand)];
const wildcard = 'J';
const hasWildcard = (hand: Hand) => hand.some((card) => card === wildcard);
const numWildcards = (hand: Hand) => hand.filter((card) => card === wildcard).length;
const checkHand = (hand: Hand) => {
    if (hand.length !== 5) {
        throw new Error('hand must be 5 cards');
    }
};
const is5OfAKind = (hand: Hand) => {
    checkHand(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        if (numWild === 5) {
            return true;
        }
        if (numWild === 4) {
            // JJJJX
            return true;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        if (numWild === 3 && nonWildUniques.length === 1) {
            return true;
        }
        if (numWild === 2 && nonWildUniques.length === 1) {
            return true;
        }
        if (numWild === 1 && nonWildUniques.length === 1) {
            return true;
        }
    }
    return distinct(hand).length === 1;
};

const is4OfAKind = (hand: Hand) => {
    // console.log('🚀 ~ file: day7Part2.ts:71 ~ is4OfAKind ~ hand:', hand);
    checkHand(hand);
    if (is5OfAKind(hand)) {
        return false;
    }

    const uniques = distinct(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        // console.log('🚀 ~ file: day7Part2.ts:76 ~ is4OfAKind ~ numWild:', numWild);
        if (numWild === 5) {
            // covered by 5 of a kind
            return false;
        }
        if (numWild === 4) {
            // covered by 5 of a kind
            return false;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        // console.log('🚀 ~ file: day7Part2.ts:87 ~ is4OfAKind ~ nonWildUniques:', nonWildUniques);
        const numNonWildUniques = nonWildUniques.length;
        // console.log('🚀 ~ file: day7Part2.ts:88 ~ is4OfAKind ~ numNonWildUniques:', numNonWildUniques);
        if (numWild === 3 && numNonWildUniques === 1) {
            // JJJXY
            return false; // is 5 of a kind
        }
        if (numWild === 3 && numNonWildUniques === 2) {
            return true; // is 4 of a kind
        }
        if (numWild === 2 && numNonWildUniques === 2) {
            // JJJXY
            return true;
        }
        if (numWild === 2 && numNonWildUniques === 3) {
            return false;
        }
        if (
            numWild === 1 &&
            numNonWildUniques === 2 &&
            nonWildUniques.some(card => hand.filter((c) => c === card).length === 3)
        ) {
            return true;
        }
        if (numWild === 1 && numNonWildUniques === 1) {
            return false;
        }
        if (numWild === 1 && numNonWildUniques === 3) {
            return false;
        }
        if (numWild === 1 && numNonWildUniques === 2) {
            return false;
        }

        // console.log('🚀 ~ file: day7Part2.ts:124 ~ is4OfAKind ~ nonWildUniques:', nonWildUniques);
        if (
            numWild === 1 &&
            numNonWildUniques === 2 &&
            nonWildUniques.some((card) => hand.filter((c) => c === card).length === 3)
        ) {
            return true;
        }
        if (numWild === 1 && numNonWildUniques === 4) {
            return false;
        }
        // console.log('find me', { numWild, numNonWildUniques, nonWildUniques, hand, });
    }
    return uniques.length === 2 && uniques.some((card) => hand.filter((c) => c === card).length === 4);
};
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
const fullHouse = (hand: Hand) => {
    // console.log('🚀 ~ file: day7Part2.ts:103 ~ fullHouse ~ hand:', hand);
    checkHand(hand);
    if (is4OfAKind(hand) || is5OfAKind(hand)) {
        return false;
    }
    const uniques = distinct(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        // console.log('🚀 ~ file: day7Part2.ts:146 ~ fullHouse ~ numWild:', numWild);
        if (numWild === 5) {
            // covered by 5 of a kind
            return false;
        }
        if (numWild === 4) {
            // covered by 5 of a kind
            return false;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        // console.log('🚀 ~ file: day7Part2.ts:157 ~ fullHouse ~ nonWildUniques:', nonWildUniques);
        const numNonWildUniques = nonWildUniques.length;
        // console.log('🚀 ~ file: day7Part2.ts:158 ~ fullHouse ~ numNonWildUniques:', numNonWildUniques);
        if (numWild === 1 && numNonWildUniques === 2){
            return nonWildUniques.every(card => hand.filter((c) => c === card).length === 2);
        }
        if (numWild === 3 && numNonWildUniques === 2) {
            return false; // is 4 of a kind
        }
        if (numWild === 3 && numNonWildUniques === 1) {
            return false;
        }

        if (numWild === 2 && numNonWildUniques === 2) {
            // JJ XXZ
            return false;
        }
        if (numWild === 2 && numNonWildUniques === 1) {
            // JJ X Y Z
            return false;
        }
        return false;
    }
    if (uniques.length !== 2) {
        return false;
    }
    const first = uniques[0];
    const second = uniques[1];
    return hand.filter((c) => c === first).length === 3 || hand.filter((c) => c === second).length === 3;
};
//Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
const threeOfAKind = (hand: Hand) => {
    // console.log('🚀 ~ file: day7Part2.ts:159 ~ threeOfAKind ~ hand:', hand);
    checkHand(hand);
    if (fullHouse(hand) || is4OfAKind(hand) || is5OfAKind(hand)) {
        return false;
    }
    const uniques = distinct(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        if (numWild === 5) {
            // covered by 5 of a kind
            return false;
        }
        if (numWild === 4) {
            // covered by 5 of a kind
            return false;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        if (numWild === 3 && nonWildUniques.length === 2) {
            // JJJXY
            return false;
        }
        if (numWild === 2 && nonWildUniques.length === 3) {
            // JJXYZ
            return true;
        }
        if (numWild === 1 && nonWildUniques.length === 2) {
            return false;
        }
        if (numWild === 1 && nonWildUniques.length === 3) {
            // JJ X VZ
            return true;
        }
        if (numWild === 1 && nonWildUniques.length === 4) {
            return false;
        }
    }
    if (uniques.length !== 3) {
        return false;
    }
    return uniques.some((card) => hand.filter((c) => c === card).length === 3);
};

//Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
const twoPair = (hand: Hand) => {
    // console.log('🚀 ~ file: day7Part2.ts:203 ~ twoPair ~ hand:', hand);
    checkHand(hand);
    if (threeOfAKind(hand) || fullHouse(hand) || is4OfAKind(hand) || is5OfAKind(hand)) {
        return false;
    }
    const uniques = distinct(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        if (numWild === 5) {
            // covered by 5 of a kind
            return false;
        }
        if (numWild === 4) {
            // covered by 5 of a kind
            return false;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        if (numWild === 3 && nonWildUniques.length === 2) {
            // JJJXY
            return false; // is 4 of a kind
        }
        if (numWild === 2 && nonWildUniques.length === 3) {
            // JJ XYZ
            return true;
        }
        if (numWild === 1 && nonWildUniques.length === 3) {
            // J XX Y Z
            return true;
        }
    }
    if (uniques.length !== 3) {
        return false;
    }
    const counts = uniques.map((card) => hand.filter((c) => c === card).length);
    const sortedCounts = counts.sort((a, b) => a - b);
    return sortedCounts[0] === 1 && sortedCounts[1] === 2 && sortedCounts[2] === 2;
};
const onePair = (hand: Hand) => {
    checkHand(hand);
    if (twoPair(hand) || threeOfAKind(hand) || fullHouse(hand) || is4OfAKind(hand) || is5OfAKind(hand)) {
        return false;
    }
    const uniques = distinct(hand);
    if (hasWildcard(hand)) {
        const numWild = numWildcards(hand);
        if (numWild === 5) {
            // covered by 5 of a kind
            return false;
        }
        if (numWild === 4) {
            // covered by 5 of a kind
            return false;
        }
        const nonWild = hand.filter((card) => card !== wildcard);
        const nonWildUniques = distinct(nonWild);
        if (numWild === 3 && nonWildUniques.length === 2) {
            // JJJXY
            return false; // is 4 of a kind
        }
        if (numWild === 2 && nonWildUniques.length === 3) {
            // JJ XYZ
            return false; // is 2 pair
        }
        if (numWild === 1 && nonWildUniques.length === 3) {
            // J XX Y Z
            return false; // is 2 pair
        }
        if (numWild === 1 && nonWildUniques.length === 4) {
            // JX YZA
            return true; // is 1 pair
        }
    }
    if (uniques.length !== 4) {
        return false;
    }
    const counts = uniques.map((card) => hand.filter((c) => c === card).length);
    const sortedCounts = counts.sort((a, b) => a - b);
    return sortedCounts[0] === 1 && sortedCounts[1] === 1 && sortedCounts[2] === 1 && sortedCounts[3] === 2;
};
const highCard = (hand: Hand) => {
    checkHand(hand);
    if (
        onePair(hand) ||
        twoPair(hand) ||
        threeOfAKind(hand) ||
        fullHouse(hand) ||
        is4OfAKind(hand) ||
        is5OfAKind(hand)
    ) {
        return false;
    }
    const uniques = distinct(hand);
    if (uniques.length !== 5) {
        return false;
    }
    return true;
};

const rankHand = (hand: string) => {
    const cards = hand.split('').map((card) => card as Card);
    if (is5OfAKind(cards)) {
        return 10;
    }
    if (is4OfAKind(cards)) {
        return 9;
    }
    if (fullHouse(cards)) {
        return 8;
    }
    if (threeOfAKind(cards)) {
        return 7;
    }
    if (twoPair(cards)) {
        return 6;
    }
    if (onePair(cards)) {
        return 5;
    }
    if (highCard(cards)) {
        return 4;
    }
    throw new Error('unknown hand');
};
const run = (input: string) => {
    const runs = input
        .split('\n')
        .map((line) => line.split(/\s+/))
        .map(([hand, bid]) => ({ hand, bid: Number(bid) }));
    const scored = runs.map((run) => {
        const rank = rankHand(run.hand);
        const cardsRank = run.hand.split('').map((card) => cardRank[card as Card]);
        // // console.log('🚀 ~ file: day7.ts:117 ~ run.forEach ~ rank',run.hand,  rank);
        return {
            run,
            rank,
            cardsRank,
        };
    });
    const sorted = sortBy(scored, [
        (x) => x.rank,
        (x) => x.cardsRank[0],
        (x) => x.cardsRank[1],
        (x) => x.cardsRank[2],
        (x) => x.cardsRank[3],
        (x) => x.cardsRank[4],
    ]);
    const handRanked = sorted.map((x, i) => {
        return {
            ...x,
            handRank: i + 1,
            winning: (i + 1) * x.run.bid,
        };
    });

    // console.log('🚀 ~ file: day7.ts:126 ~ run ~ sorted:', handRanked);
    handRanked.forEach((x) => {
        console.log(x.run.hand, x.run.bid);
    });
    const sumOfWinning = handRanked.reduce((acc, x) => acc + x.winning, 0);
    console.log('🚀 ~ file: day7.ts:146 ~ run ~ sumOfWinning:', sumOfWinning);
};

const testInput1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const testInput2 = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;

run(testInput1);
run(testInput2);
run(day7Input);

const fiveOfAKinds: Hand[] = [
    ['A', 'A', 'A', 'A', 'A'],
    ['J', 'J', 'J', 'J', 'J'],
    ['J', 'J', 'J', 'J', 'A'],
    ['J', 'J', 'J', 'A', 'A'],
    ['J', 'J', 'A', 'A', 'A'],
    ['J', 'A', 'A', 'A', 'A'],
];
const fourOfAKinds: Hand[] = [
    ['A', 'A', 'A', 'A', 'K'],
    ['J', 'J', 'J', 'A', 'K'],
    ['J', 'J', 'K', 'K', 'A'],
    'AA8AA'.split('') as Hand,
    'T55J5'.split('') as Hand,
    'KTJJT'.split('') as Hand,
    'QQQJA'.split('') as Hand,
    'QJJQ2'.split('') as Hand,
];
const fullHouses: Hand[] = ['23332'.split('') as Hand, 'T3T3J'.split('') as Hand];
const threeOfAKinds: Hand[] = [
    'TTT98'.split('') as Hand,
    'JTT98'.split('') as Hand,
    'JJT98'.split('') as Hand,
    '2245J'.split('') as Hand,
];
const twoPairs: Hand[] = ['23432'.split('') as Hand];
const onePairs: Hand[] = ['32T3K'.split('') as Hand, '2345J'.split('') as Hand];
fiveOfAKinds.forEach((hand) => {
    assert(is5OfAKind(hand), 'is5OfAKind - ' + hand);
    assert(!is4OfAKind(hand), 'is5OfAKind not is4OfKind - ' + hand);
    assert(!threeOfAKind(hand), 'is5OfAKind not threeOfAKind - ' + hand);
    assert(!fullHouse(hand), 'is5OfAKind not fullHouse - ' + hand);
    assert(!twoPair(hand), 'is5OfAKind not twoPair - ' + hand);
    assert(!onePair(hand), 'is5OfAKind not onePair - ' + hand);
});
fourOfAKinds.forEach((hand) => {
    assert(is4OfAKind(hand), 'is4OfAKind - ' + hand);
    assert(!is5OfAKind(hand), 'is4OfAKind not is5OfAKind - ' + hand);
    assert(!threeOfAKind(hand), 'is4OfAKind not threeOfAKind - ' + hand);
    assert(!fullHouse(hand), 'is4OfAKind not fullHouse - ' + hand);
    assert(!twoPair(hand), 'is4OfAKind not twoPair - ' + hand);
    assert(!onePair(hand), 'is4OfAKind not onePair - ' + hand);
});
fullHouses.forEach((hand) => {
    assert(fullHouse(hand), 'fullHouse - ' + hand);
    assert(!is4OfAKind(hand), 'fullHouse not is4OfAKind - ' + hand);
    assert(!is5OfAKind(hand), 'fullHouse not is5OfAKind - ' + hand);
    assert(!threeOfAKind(hand), 'fullHouse not threeOfAKind - ' + hand);
    assert(!twoPair(hand), 'fullHouse not twoPair - ' + hand);
    assert(!onePair(hand), 'fullHouse not onePair - ' + hand);
});
threeOfAKinds.forEach((hand) => {
    assert(threeOfAKind(hand), 'threeOfAKind - ' + hand);
    assert(!is4OfAKind(hand), 'threeOfAKind not is4OfAKind - ' + hand);
    assert(!is5OfAKind(hand), 'threeOfAKind not is5OfAKind - ' + hand);
    assert(!fullHouse(hand), 'threeOfAKind not fullHouse - ' + hand);
    assert(!twoPair(hand), 'threeOfAKind not twoPair - ' + hand);
    assert(!onePair(hand), 'threeOfAKind not onePair - ' + hand);
});
twoPairs.forEach((hand) => {
    assert(twoPair(hand), 'twoPair - ' + hand);
    assert(!is4OfAKind(hand), 'twoPair not is4OfAKind - ' + hand);
    assert(!is5OfAKind(hand), 'twoPair not is5OfAKind - ' + hand);
    assert(!fullHouse(hand), 'twoPair not fullHouse - ' + hand);
    assert(!threeOfAKind(hand), 'twoPair not threeOfAKind - ' + hand);
    assert(!onePair(hand), 'twoPair not onePair - ' + hand);
});
onePairs.forEach((hand) => {
    assert(onePair(hand), 'onePair - ' + hand);
    assert(!is4OfAKind(hand), 'onePair not is4OfAKind - ' + hand);
    assert(!is5OfAKind(hand), 'onePair not is5OfAKind - ' + hand);
    assert(!fullHouse(hand), 'onePair not fullHouse - ' + hand);
    assert(!threeOfAKind(hand), 'onePair not threeOfAKind - ' + hand);
    assert(!twoPair(hand), 'onePair not twoPair - ' + hand);
});
