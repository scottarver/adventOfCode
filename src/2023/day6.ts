const testInput = `Time:      7  15   30
Distance:  9  40  200`;

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const run = (input: string) => {
    const [times, distances] = input.split('\n').map(line => line.split(/\s+/).slice(1).map(Number));
    // console.log({ times, distances });

    const runs = times.map((time, i) => ({ time, distance: distances[i] }));
    console.log('🚀 ~ file: day6.ts:9 ~ run ~ runs:', runs);

    const runsWins = runs.map((run,runNum) => {

        let wins = 0;
        for(let i = 0; i <= run.time; i++) {
            // log percentage
            if (i % 1000 === 0) {
                console.log(`${runNum} ${i}/${run.time} ${Math.round((i / run.time) * 100)}%`);
            }
            // console.log('🚀 ~ file: day6.ts:14 ~ run.map ~ i', i);
            if(i === 0 || i === run.time) {
                // console.log('no distance');
                continue;
            }
            const chargeTime = i;
            const availableTravelTime = run.time - chargeTime;
            if(availableTravelTime === 0 || chargeTime === 0) {
                // console.log('no distance, bad math');
                continue;
            }
            const speed = chargeTime;
            const distance = speed * availableTravelTime;
            // console.log(runNum, {
            //     chargeTime,
            //     availableTravelTime,
            //     speed,
            //     distance,
            //     isWin: distance > run.distance,
            // });

            if (distance > run.distance) {
                wins+=1;
            }


        }
        return wins;

    }).filter(x => x !== undefined);
    console.log('🚀 ~ file: day6.ts:47 ~ runsWins ~ runsWins:', runsWins);
    const multiplied = runsWins.reduce((acc, x) => acc * x, 1);
    console.log('🚀 ~ file: day6.ts:50 ~ run ~ multiplied:', multiplied);

    // const number


}

const realInput1 = `Time:        47     84     74     67
Distance:   207   1394   1209   1014`;

const realInput2 = `Time:        47847467
Distance:   207139412091014`;

// run(testInput);
// run(realInput1);
run(realInput2);
