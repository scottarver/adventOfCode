import { has, keyBy, omit } from 'lodash';
import { day8Input } from './day8Input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const testInput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

function parseLine(input: string): { name: string; left: string; right: string } {
    // Splitting the input string into two parts: before and after '='
    const [namePart, rest] = input.split('=').map((part) => part.trim());

    // Removing the parentheses and splitting the rest into left and right
    const [left, right] = rest
        .replace('(', '')
        .replace(')', '')
        .split(',')
        .map((part) => part.trim());

    // Constructing the object
    return { name: namePart, left, right };
}
type UnwrapArray<A> = A extends unknown[] ? UnwrapArray<A[number]> : A;

class Map {
    private nodes: Node[] = [];
    public root: Node;
    constructor(public input: string[]) {
        const parsedInput = input.map((line) => {
            // regex out the name, left and right
            const lineParts = parseLine(line);
            // console.log('🚀 ~ file: day8.ts:38 ~ Map ~ input.split ~ lineParts:', lineParts);
            return lineParts;
        });

        const indexedMainNodes = {};

        parsedInput.forEach((line) => {
            const newNode = new Node(line.name);
            indexedMainNodes[line.name] = newNode;
        });
        parsedInput.forEach((line) => {
            const foundNode = indexedMainNodes[line.name];
            const leftNode = indexedMainNodes[line.left];
            const rightNode = indexedMainNodes[line.right];
            if (leftNode) {
                foundNode.left = leftNode;
            }
            if (rightNode) {
                foundNode.right = rightNode;
            }
        });
        const foundFirst = indexedMainNodes['AAA'];
        this.root = foundFirst;

        // console.log(indexedMainNodes);
        this.nodes = Object.values(indexedMainNodes);
    }
    public getNodeByName(name: string) {
        return this.nodes.find((node) => node.name === name);
    }
    public getRoot() {
        return this.root;
    }
    public getStaringNodes() {
        return this.nodes.filter((node) => node.name.endsWith('A'));
    }
}
class Node {
    constructor(
        public name: string,
        public left?: Node,
        public right?: Node,
    ) {}
    toString() {
        return this.name;
    }
    getLeft() {
        return this.left;
    }
    getRight() {
        return this.right;
    }
    hasLeft() {
        return !!this.left;
    }
    hasRight() {
        return !!this.right;
    }
    isEndingNode() {
        return this.name.endsWith('Z');
    }
    isDeadEnd() {
        if (this.left === this && this.right === this) {
            return true;
        }
        return !this.left && !this.right;
    }
}
function run(input: string) {
    const [directions, trash, ...nodes] = input.split('\n');

    const map = new Map(nodes);

    const parsedDirections = directions.split('');

    let counter = 0;
    let steps = 0;

    let ghosts = map.getStaringNodes();
        console.log('num starting nodes', ghosts.length);
        console.log(
            'starting nodes',
            ghosts.map((node) => node.name),
        );

    const stepsToZ: number[] = [];
    // for each ghost, find time to z, while also looking for loops
    for (let ghostIndex = 0; ghostIndex < ghosts.length; ghostIndex++) {
        let currentGhost = ghosts[ghostIndex];
        // use parsedDirections in a loop
        let currentSteps = 0;
        let seen = new Set<string>();
        let breakOut = false;
        while (true && breakOut === false) {
            for (const [index, direction] of parsedDirections.entries()) {
            currentSteps++;
                // console.log({ ghostIndex, direction, index, currentNode: currentGhost.name, });
                const uniqueName = currentGhost.name + '-' + index;
                if (seen.has(uniqueName)) {
                    console.log('seen', uniqueName, 'before');
                    breakOut = true;
                    break;
                }
                seen.add(uniqueName);
                if (direction === 'R') {
                    currentGhost = currentGhost.getRight();
                } else {
                    currentGhost = currentGhost.getLeft();
                }

                if (currentGhost.isEndingNode()) {
                    console.log(ghostIndex, 'found Z', currentGhost.name, 'in', currentSteps, 'steps');
                    stepsToZ.push(currentSteps);
                }
            }
        }
    }
    console.log('🚀 ~ file: day8Part2.ts:127 ~ run ~ stepsToZ:', stepsToZ);



    // while (counter < 100000000) {
    //     counter++;
    //     if (counter % 100000 === 0) {
    //         console.log('going around', counter, steps);
    //     }
    //     for (const direction of parsedDirections) {
    //         steps++;
    //         for (let i = 0; i < ghosts.length; i++) {
    //             // console.log('on ghost', i, 'going direction', direction, 'on node', ghosts[i].name);
    //             const ghost = ghosts[i];

    //             if (direction === 'R') {
    //                 if (ghost.hasRight()) {
    //                     ghosts[i] = ghost.getRight();
    //                     // console.log('going right to', currentNode.name);
    //                 }
    //             } else {
    //                 if (ghost.hasLeft()) {
    //                     ghosts[i] = ghost.getLeft();
    //                     // console.log('going left to', currentNode.name);
    //                 }
    //             }
    //         }

    //         if (ghosts.every((node) => node.isEndingNode())) {
    //             console.log(
    //                 'all ghosts are in Z',
    //                 ghosts.map((node) => node.name),
    //             );
    //             break;
    //         }
    //     }
    //     if (ghosts.every((node) => node.isEndingNode())) {
    //         console.log(
    //             'all ghosts are in Z',
    //             ghosts.map((node) => node.name),
    //         );
    //         break;
    //     }
    // }
    console.log({
        counter,
        steps,
        ghostPositions: ghosts.map((node) => node.name),
    });

    // while (!currentNode.isDeadEnd() && counter < 100 && currentNode.name !== 'ZZZ') {
    //     counter++;
    //     console.log('going around', counter);
    //     parsedDirections.forEach((direction) => {
    //         console.log('new dirction', direction, currentNode.name);

    //         if (currentNode.isDeadEnd()) {
    //             // console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
    //             return;
    //         }
    //         steps++;
    //         if (direction === 'R') {
    //             if (currentNode.hasRight()) {
    //                 currentNode = currentNode.getRight();
    //                 // console.log('going right to', currentNode.name);
    //             }
    //         } else {
    //             if (currentNode.hasLeft()) {
    //                 currentNode = currentNode.getLeft();
    //                 // console.log('going left to', currentNode.name);
    //             }
    //         }
    //         // console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
    //         // console.log( '🚀 ~ file: day8.ts:136 ~ parsedDirections.forEach ~ currentNode.isDeadEnd():', currentNode.isDeadEnd(),);
    //         // if (currentNode.isDeadEnd()) {
    //         //     console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
    //         // }
    //         // }
    //     });
    // }
    console.log('🚀 ~ file: day8.ts:118 ~ run ~ steps:', steps);
    console.log('done');
}

run(testInput);
console.log('\n\n');
run(day8Input);
