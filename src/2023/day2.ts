import { realInput } from './day2aInput';
// clear terminal
console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');
type BallCollection = {
    red: number;
    blue: number;
    green: number;
};

function splitAtFirst(s: string, delimiter: string): [string, string] {
    const index = s.indexOf(delimiter);
    if (index === -1) {
        return [s, ''];
    }

    return [s.slice(0, index), s.slice(index + delimiter.length).trim()];
}

function parseDraw(draw: string): BallCollection {
    // 3 blue, 4 red
    // console.log('got', draw);
    const parts = draw.split(',').map((s) => s.trim());
    const byColor = parts.map((s) => {
        const [count, color] = splitAtFirst(s, ' ');
        return { count: parseInt(count), color };
    });
    // console.log({ byColor });
    const asObj = byColor.reduce(
        (acc, val) => {
            acc[val.color] = val.count;
            return acc;
        },
        { red: 0, blue: 0, green: 0 },
    );

    // console.log(asObj);
    return asObj;
}

function parseGameLine(line: string): {
    header: string;
    draws: BallCollection[];
} {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

    const [header, allGameHands] = splitAtFirst(line, ':');
    const gameHands = allGameHands.split(';').map((draw) => draw.trim());

    const draws = gameHands.map((x) => parseDraw(x));
    return {
        header,
        draws,
    };
}

function parseGameLines(lines: string) {
    return lines.split('\n').map(parseGameLine);
}

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const checkGame = (possibles: BallCollection, input: string) => {
    const res = parseGameLines(input);
    // console.log(res);

    const possibleGames = res.filter((game) => {
        return game.draws.every((draw) => {
            return draw.red <= possibles.red && draw.green <= possibles.green && draw.blue <= possibles.blue;
        });
    });
    // console.log(possibleGames);

    const possibleHeaders = possibleGames.map((game) => game.header);
    // console.log(possibleHeaders);
    const possibleJustNumbers = possibleHeaders.map((header) => parseInt(header.split(' ')[1]));
    // console.log(possibleJustNumbers);
    const sum = possibleJustNumbers.reduce((acc, val) => acc + val, 0);
    console.log(sum);

    // powers

    const powers2 = res.map((game) => {
        console.log(game.header);

        const powers = game.draws.reduce(
            (acc, val) => {
                acc.red = Math.max(acc.red, val.red);
                acc.green = Math.max(acc.green, val.green);
                acc.blue = Math.max(acc.blue, val.blue);
                return acc;
            },
            { red: 0, blue: 0, green: 0 },
        );
        console.log(powers);

        const power = powers.red * powers.green * powers.blue;
        console.log(power);
        return power;
    });
    console.log(powers2);
    // sum of powers
    const sum2 = powers2.reduce((acc, val) => acc + val, 0);
    console.log(sum2);

};

const testSetup = {
    red: 12,
    green: 13,
    blue: 14,
};

checkGame(testSetup, testInput);

const realSetup = {
    red: 12,
    green: 13,
    blue: 14,
};

checkGame(realSetup, realInput);
