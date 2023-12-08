import { orderBy, sortBy } from 'lodash';
import { day7Input } from './day7Input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
const cardRank = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
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
const checkHand = (hand: Hand) => {
    if (hand.length !== 5) {
        throw new Error('hand must be 5 cards');
    }
};
const is5OfAKind = (hand: Hand) => {
    checkHand(hand);
    return distinct(hand).length === 1;
};
const is4OfAKind = (hand: Hand) => {
    checkHand(hand);
    const uniques = distinct(hand);
    return uniques.length === 2 && uniques.some((card) => hand.filter((c) => c === card).length === 4);
};
const fullHouse = (hand: Hand) => {
    checkHand(hand);
    const uniques = distinct(hand);
    if (uniques.length !== 2) {
        return false;
    }
    const first = uniques[0];
    const second = uniques[1];
    return hand.filter((c) => c === first).length === 3 || hand.filter((c) => c === second).length === 3;
};
//Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
const threeOfAKind = (hand: Hand) => {
    checkHand(hand);
    const uniques = distinct(hand);
    if (uniques.length !== 3) {
        return false;
    }
    return uniques.some((card) => hand.filter((c) => c === card).length === 3);
};

//Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
const twoPair = (hand: Hand) => {
    checkHand(hand);
    const uniques = distinct(hand);
    if (uniques.length !== 3) {
        return false;
    }
    const counts = uniques.map((card) => hand.filter((c) => c === card).length);
    const sortedCounts = counts.sort((a, b) => a - b);
    return sortedCounts[0] === 1 && sortedCounts[1] === 2 && sortedCounts[2] === 2;
};
const onePair = (hand: Hand) => {
    checkHand(hand);
    const uniques = distinct(hand);
    if (uniques.length !== 4) {
        return false;
    }
    const counts = uniques.map((card) => hand.filter((c) => c === card).length);
    const sortedCounts = counts.sort((a, b) => a - b);
    return sortedCounts[0] === 1 && sortedCounts[1] === 1 && sortedCounts[2] === 1 && sortedCounts[3] === 2;
};
const highCard = (hand: Hand) => {
    checkHand(hand);
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
        // console.log('🚀 ~ file: day7.ts:117 ~ run.forEach ~ rank',run.hand,  rank);
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

    console.log('🚀 ~ file: day7.ts:126 ~ run ~ sorted:', handRanked);
    const sumOfWinning = handRanked.reduce((acc, x) => acc + x.winning, 0);
    console.log('🚀 ~ file: day7.ts:146 ~ run ~ sumOfWinning:', sumOfWinning);
};

const testInput1 = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

run(testInput1);
run(day7Input);
