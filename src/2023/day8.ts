import { has, keyBy } from 'lodash';
import { day8Input } from './day8Input';

console.log('\x1Bc');
console.log('\n\n\n\n\n\n\nnew run \n\n\n\n\n');

const testInput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

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

    let currentNode = map.getRoot();
    // console.log('🚀 ~ file: day8.ts:116 ~ run ~ currentNode:', currentNode);

    let counter = 0;
    let steps = 0;
    while (!currentNode.isDeadEnd() && counter < 100 && currentNode.name !== 'ZZZ') {
        counter++;
        console.log('going around', counter);
        parsedDirections.forEach((direction) => {
            console.log('new dirction', direction, currentNode.name);

            if (currentNode.isDeadEnd()) {
                // console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
                return;
            }
            steps++;
            if (direction === 'R') {
                if (currentNode.hasRight()) {
                    currentNode = currentNode.getRight();
                    // console.log('going right to', currentNode.name);
                }
            } else {
                if (currentNode.hasLeft()) {
                    currentNode = currentNode.getLeft();
                    // console.log('going left to', currentNode.name);
                }
            }
            // console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
            // console.log( '🚀 ~ file: day8.ts:136 ~ parsedDirections.forEach ~ currentNode.isDeadEnd():', currentNode.isDeadEnd(),);
            // if (currentNode.isDeadEnd()) {
            //     console.log('🚀 ~ file: day8.ts:142 ~ run ~ currentNode', currentNode.name);
            // }
            // }
        });
    }
    console.log('🚀 ~ file: day8.ts:118 ~ run ~ steps:', steps);
    console.log('done');
}

run(testInput);
console.log('\n\n');
run(testInput2);
console.log('\n\n');
run(day8Input);
