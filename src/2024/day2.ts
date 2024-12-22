import day2Input from "./day2Input";

function day2(input: string): number {
    const lines = input.split('\n');

    function parseLine(line: string): number[] {
        return line.split(' ').map((x) => parseInt(x, 10));
    }
    const parsedLines = lines.map((line) => parseLine(line));



    const removeEveryElement = (line: number[]): number[][] => {
        const results = [line];
        for (let i = 0; i < line.length; i++) {
            const copy = [...line];
            copy.splice(i, 1);
            results.push(copy);
        }
        return results;
    }


    function processLine(line: number[], removeIndex?:number): "safe" | "unsafe" {


        
        const modifiedLine = removeIndex ? line.filter((_, i) => i !== removeIndex) : line;
        const differences = [];

        for (let i = 0; i < modifiedLine.length - 1; i++) {
            const first = modifiedLine[i];
            const next = modifiedLine[i + 1];
            differences.push(next - first);
        }

        console.log(differences);
        const hasPositive = differences.some((x) => x > 0);
        const hasNegative = differences.some((x) => x < 0);
        const hasZero = differences.some((x) => x === 0);

        if (hasZero) {
            console.log('unsafe because zero found', differences);
            return "unsafe";
        }
        if (hasPositive && hasNegative) {

            console.log('unsafe because not all positive or negative', differences);
            return "unsafe";
        }

        const result = differences.every((x) => Math.abs(x) <= 3) ? "safe" : "unsafe";
        console.log(result, differences);
        return result;

    }

    // part 1
    // const diffs = parsedLines.map((line) => processLine(line));
    // part 2
    const diffs = parsedLines.map(line => {
        const allVariations = removeEveryElement(line);
        const results = allVariations.map((x) => processLine(x));
        if (results.includes("safe")) {
            return "safe";
        }
        return "unsafe";
    });

    const safe = diffs.filter(line => line === "safe").length;
    return safe;



}


const day2TestInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const result = day2(day2TestInput);
console.log(result);

console.log("\n\nactual")
console.log(day2(day2Input));