import { day5Input } from "./day5Input";

const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const run1 = (input: string) => {
    console.log('hi');
    const [seedLine, ...roughMaps] = input.split('\n\n');
    console.log('🚀 ~ file: day5.ts:42 ~ run1 ~ seedLine:', seedLine);
    const seeds = seedLine
        .split(':')[1]
        .trim()
        .split(' ')
        .map((x) => parseInt(x, 10));
    console.log('🚀 ~ file: day5.ts:43 ~ run1 ~ seeds:', seeds);
    // console.log('🚀 ~ file: day5.ts:42 ~ run1 ~ roughMaps:', roughMaps);
    // console.log('🚀 ~ file: day5.ts:42 ~ run1 ~ seedLine:', seedLine);
    const maps = [];

    roughMaps.forEach((map) => {
        const [mapNameRought, ...mapLinesRough] = map.split('\n');
        const mapName = mapNameRought.split(' ')[0].trim();
        console.log('🚀 ~ file: day5.ts:51 ~ roughMaps.forEach ~ mapName:', mapName);
        const mapNameClean = mapName.replace(/-to-/g, 'To');
        const mapLines = mapLinesRough.map((line) => line.split(' ').map((x) => parseInt(x, 10)));
        mapLines.forEach((line) => {
            maps.push({
                source: mapNameClean.split('To')[0],
                target: mapNameClean.split('To')[1],
                sourceStart: line[1],
                sourceEnd: line[1] + line[2],
                destinationStart: line[0],
                destinationEnd: line[0] + line[2],
                range: line[2],
            });
        });
    });
    console.log('🚀 ~ file: day5.ts:55 ~ roughMaps.forEach ~ maps:', maps);

    const finalLocations = [];
    seeds.forEach((seed) => {
        let tracer = seed;

        let currentCat: string | null = 'seed';
        let lastCat = currentCat;
        while (currentCat) {
            console.log('🚀 ~ file: day5.ts:77 ~ seeds.forEach ~ currentCat:', currentCat);
            console.log('🚀 ~ file: day5.ts:73 ~ seeds.forEach ~ tracer:', tracer);
            const foundMaps = maps.filter((map) => map.source === currentCat);
            if (foundMaps.length === 0) {
                currentCat = null;
                break;
            }

            const dest = foundMaps[0].target;
            console.log('🚀 ~ file: day5.ts:80 ~ seeds.forEach ~ dest:', dest);
            console.log('🚀 ~ file: day5.ts:79 ~ seeds.forEach ~ foundMaps:', foundMaps);
            currentCat = dest;
            lastCat = currentCat;
            const correctPlace = foundMaps.find((map) => map.sourceStart <= tracer && tracer <= map.sourceEnd);
            console.log('🚀 ~ file: day5.ts:92 ~ seeds.forEach ~ correctPlace:', correctPlace);
            if (correctPlace) {
                tracer = correctPlace.destinationStart + (tracer - correctPlace.sourceStart);
            }
        }
        console.log('last lastCat', lastCat);
        finalLocations.push(tracer);
    });
    return finalLocations;
};

const results = run1(testInput);
console.log('🚀 ~ file: day5.ts:105 ~ results:', results);
const minResult = Math.min(...results);
console.log('🚀 ~ file: day5.ts:107 ~ minResult:', minResult);

const results2 = run1(day5Input);
console.log('🚀 ~ file: day5.ts:105 ~ results2:', results2);
const minResult2 = Math.min(...results2);
console.log('🚀 ~ file: day5.ts:107 ~ minResult2:', minResult2);
