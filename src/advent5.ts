import { initial, last } from 'lodash';

process.stdout.write('\u001b[3J\u001b[1J');
console.clear();
// console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")

const testInput1 = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

class Stack<T> {
    private items: T[] = [];

    constructor(public name: string, public location: number) {}

    push(item: T) {
        console.log(`pushing ${item} to ${this.name}`);
        this.items = [...this.items, item];
    }

    pushMany(items: T[]) {
        items.forEach((item) => this.push(item));
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new Error(`Stack is empty, ${this.name}`);
        }
        const [newItems, popped] = [initial(this.items), last(this.items)];
        this.items = newItems;
        console.log(`popping ${popped} from ${this.name}`);
        return popped;
    }

    popMany(howMany: number): T[] {
        if (this.length < howMany) {
            throw new Error(`Not enough items in stack, ${this.name}`);
        }

        const popped: T[] = [];
        for (let i = 0; i < howMany; i++) {
            popped.push(this.pop());
        }
        return popped.reverse();
    }

    peek(): T {
        return this.items[this.items.length - 1];
    }

    peekMany(howMany: number): T[] {
        if (this.length < howMany) {
            throw new Error(`Not enough items in stack, ${this.name}`);
        }

        return this.items.slice(this.items.length - howMany);
    }

    getStack(): T[] {
        return [...this.items];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    get length(): number {
        return this.items.length;
    }

    toString(): string {
        const asString = this.items.map((item, index) => {
            return `${index}:${item}`;
        });
        return `${this.name}@${this.location} (${this.length}): ${asString.join(' ')}`;
    }
}

const testStack = new Stack('test', 0);
testStack.push('a');
testStack.push('b');
console.assert(testStack.pop() === 'b', 'pop b');
console.assert(testStack.pop() === 'a', 'pop a');
console.assert(testStack.isEmpty(), 'stack is empty');

const testStackMany = new Stack('test', 0);
console.assert(testStackMany.isEmpty(), 'stack is empty');
testStackMany.push('a');
testStackMany.push('b');
testStackMany.push('c');
testStackMany.push('d');

console.assert(testStackMany.popMany(2).join('') === 'cd', 'popMany 2');
console.assert(testStackMany.getStack().join('') === 'ab', 'popMany 2');
testStackMany.pushMany('xyz'.split(''));
console.assert(testStackMany.getStack().join('') === 'abxyz', 'pushMany xyz');

// parse "move 3 from 2 to 1" into { count:3, from:2, to:1}
function parseInstruction(input: string): { count: number; from: number; to: number } {
    const regex = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/;
    const match = input.match(regex);
    if (!match) {
        throw new Error(`Could not parse instruction: ${input}`);
    }
    const count = parseInt(match.groups.count, 10);
    const from = parseInt(match.groups.from, 10);
    const to = parseInt(match.groups.to, 10);
    return {
        count,
        from,
        to,
    };
}

function advent5a(input: string): string {
    const [initialState, instructions] = input.split('\n\n').map((x) => x.split('\n'));

    // stack labels are the last line of initialState
    const stackLabels = last(initialState);
    console.log({ stackLabels });

    const stackPositions: Array<{ label: string; position: number }> = [];
    for (let i = 0; i < stackLabels.length; i++) {
        const char = stackLabels[i];
        if (char !== ' ') {
            console.log('found label', char, 'at position', i);
            stackPositions.push({
                label: char,
                position: i,
            });
        }
    }
    console.log({ stackPositions });

    const stacks = stackPositions.map((x) => new Stack<string>(x.label, x.position));

    const unparsedSacks = initial(initialState);
    for (let row = unparsedSacks.length - 1; row >= 0; row--) {
        const rowString = unparsedSacks[row];
        stacks.forEach((stack) => {
            const char = rowString[stack.location];
            if (char && char !== ' ') {
                console.log('found', char, 'at', stack.name, stack.location);
                stack.push(char);
            }
        });
    }
    console.log('Before', {
        initialState,
        instructions,
        stacks: stacks.map((x) => x.toString()),
        stackLabels,
    });
    instructions.forEach((rawLine) => {
        const instruction = parseInstruction(rawLine);

        console.log('parsedInstruction', instruction);

        for (let c = 0; c < instruction.count; c++) {
            const fromStack = stacks[instruction.from - 1];
            const toStack = stacks[instruction.to - 1];

            console.log(`${c} moving ${fromStack.peek()} from ${fromStack.name} to ${toStack.name}`);
            const item = fromStack.pop();
            toStack.push(item);
        }

        console.log({
            stacks: stacks.map((x) => x.toString()),
        });
    });

    console.log('After', {
        initialState,
        instructions,
        stacks: stacks.map((x) => x.toString()),
        stackLabels,
    });

    return stacks.map((x) => x.peek()).join('');
}

// console.log(advent5(testInput1));

const input1 = `[W] [V]     [P]
[B] [T]     [C] [B]     [G]
[G] [S]     [V] [H] [N] [T]
[Z] [B] [W] [J] [D] [M] [S]
[R] [C] [N] [N] [F] [W] [C]     [W]
[D] [F] [S] [M] [L] [T] [L] [Z] [Z]
[C] [W] [B] [G] [S] [V] [F] [D] [N]
[V] [G] [C] [Q] [T] [J] [P] [B] [M]
 1   2   3   4   5   6   7   8   9

move 2 from 8 to 4
move 2 from 7 to 3
move 2 from 9 to 2
move 4 from 1 to 9
move 1 from 7 to 8
move 1 from 9 to 6
move 6 from 6 to 1
move 6 from 1 to 6
move 2 from 7 to 1
move 9 from 4 to 1
move 6 from 2 to 7
move 5 from 9 to 7
move 7 from 3 to 7
move 19 from 7 to 9
move 1 from 7 to 1
move 3 from 6 to 8
move 4 from 5 to 6
move 1 from 4 to 1
move 2 from 5 to 2
move 8 from 9 to 7
move 1 from 5 to 1
move 3 from 9 to 4
move 1 from 4 to 9
move 2 from 4 to 7
move 1 from 7 to 6
move 3 from 8 to 9
move 17 from 1 to 7
move 21 from 7 to 3
move 4 from 6 to 2
move 1 from 7 to 2
move 8 from 9 to 2
move 2 from 8 to 3
move 1 from 1 to 7
move 2 from 7 to 9
move 1 from 6 to 1
move 1 from 7 to 4
move 1 from 1 to 2
move 4 from 6 to 1
move 1 from 9 to 2
move 1 from 7 to 9
move 1 from 4 to 1
move 7 from 3 to 7
move 6 from 2 to 8
move 3 from 3 to 4
move 1 from 8 to 4
move 12 from 2 to 8
move 2 from 9 to 2
move 12 from 3 to 2
move 12 from 8 to 6
move 3 from 4 to 2
move 19 from 2 to 8
move 4 from 1 to 9
move 1 from 3 to 8
move 1 from 4 to 6
move 1 from 2 to 4
move 1 from 6 to 3
move 8 from 9 to 6
move 1 from 4 to 9
move 1 from 3 to 1
move 1 from 9 to 5
move 11 from 6 to 3
move 5 from 8 to 6
move 14 from 6 to 9
move 2 from 1 to 4
move 3 from 8 to 1
move 8 from 8 to 4
move 3 from 3 to 4
move 8 from 3 to 1
move 9 from 8 to 2
move 12 from 4 to 2
move 12 from 9 to 3
move 9 from 3 to 4
move 1 from 5 to 3
move 7 from 7 to 1
move 2 from 9 to 1
move 2 from 4 to 6
move 16 from 2 to 6
move 1 from 2 to 8
move 10 from 1 to 4
move 1 from 8 to 2
move 4 from 1 to 6
move 15 from 4 to 8
move 1 from 4 to 2
move 2 from 6 to 8
move 5 from 2 to 8
move 21 from 8 to 3
move 6 from 1 to 3
move 15 from 6 to 1
move 1 from 2 to 1
move 1 from 8 to 9
move 15 from 1 to 3
move 7 from 3 to 8
move 1 from 7 to 9
move 2 from 9 to 8
move 2 from 3 to 7
move 4 from 6 to 1
move 2 from 7 to 8
move 1 from 6 to 2
move 4 from 8 to 3
move 2 from 4 to 8
move 1 from 2 to 1
move 4 from 1 to 5
move 3 from 5 to 8
move 1 from 5 to 1
move 12 from 8 to 3
move 3 from 1 to 2
move 17 from 3 to 5
move 2 from 5 to 3
move 15 from 5 to 1
move 1 from 1 to 4
move 17 from 3 to 2
move 5 from 2 to 8
move 17 from 3 to 6
move 6 from 1 to 3
move 5 from 1 to 6
move 4 from 8 to 9
move 10 from 3 to 8
move 7 from 2 to 9
move 2 from 6 to 3
move 2 from 2 to 8
move 1 from 1 to 4
move 17 from 6 to 9
move 13 from 8 to 2
move 2 from 4 to 1
move 1 from 6 to 7
move 2 from 2 to 4
move 8 from 2 to 7
move 1 from 6 to 1
move 4 from 7 to 9
move 1 from 4 to 7
move 1 from 4 to 6
move 1 from 1 to 7
move 5 from 2 to 4
move 2 from 3 to 8
move 6 from 7 to 1
move 1 from 7 to 4
move 11 from 9 to 7
move 1 from 8 to 4
move 8 from 1 to 2
move 1 from 1 to 4
move 1 from 1 to 9
move 1 from 6 to 1
move 1 from 8 to 4
move 6 from 2 to 3
move 1 from 1 to 3
move 1 from 6 to 7
move 1 from 4 to 6
move 6 from 2 to 5
move 7 from 3 to 4
move 2 from 7 to 6
move 2 from 7 to 3
move 8 from 7 to 5
move 3 from 6 to 7
move 1 from 5 to 7
move 1 from 7 to 5
move 13 from 9 to 3
move 1 from 3 to 8
move 8 from 4 to 3
move 3 from 5 to 1
move 7 from 4 to 1
move 5 from 1 to 4
move 3 from 1 to 4
move 2 from 1 to 8
move 2 from 7 to 5
move 2 from 8 to 9
move 1 from 7 to 6
move 1 from 8 to 7
move 4 from 5 to 1
move 1 from 7 to 2
move 2 from 1 to 8
move 1 from 2 to 1
move 5 from 9 to 7
move 3 from 9 to 4
move 8 from 4 to 8
move 6 from 8 to 5
move 11 from 5 to 1
move 3 from 4 to 2
move 9 from 3 to 7
move 6 from 7 to 2
move 13 from 3 to 2
move 3 from 8 to 1
move 2 from 2 to 8
move 1 from 6 to 7
move 3 from 8 to 4
move 9 from 1 to 5
move 5 from 5 to 8
move 2 from 8 to 4
move 3 from 9 to 4
move 2 from 8 to 2
move 8 from 1 to 5
move 8 from 7 to 9
move 1 from 8 to 3
move 15 from 5 to 9
move 6 from 4 to 1
move 1 from 7 to 2
move 4 from 2 to 1
move 1 from 3 to 4
move 5 from 1 to 7
move 3 from 7 to 3
move 14 from 9 to 8
move 1 from 4 to 8
move 1 from 7 to 6
move 2 from 4 to 5
move 4 from 1 to 5
move 1 from 6 to 5
move 4 from 9 to 3
move 5 from 3 to 7
move 4 from 5 to 9
move 1 from 3 to 7
move 1 from 3 to 2
move 4 from 5 to 2
move 4 from 7 to 5
move 4 from 2 to 1
move 1 from 5 to 4
move 7 from 9 to 7
move 1 from 4 to 2
move 1 from 5 to 8
move 21 from 2 to 4
move 1 from 9 to 8
move 1 from 9 to 4
move 3 from 4 to 1
move 7 from 1 to 6
move 1 from 5 to 1
move 18 from 4 to 7
move 1 from 5 to 8
move 27 from 7 to 8
move 1 from 7 to 3
move 1 from 3 to 7
move 1 from 7 to 2
move 1 from 2 to 1
move 42 from 8 to 9
move 1 from 8 to 7
move 1 from 8 to 2
move 1 from 4 to 6
move 1 from 2 to 9
move 2 from 1 to 2
move 1 from 7 to 3
move 7 from 6 to 4
move 4 from 9 to 6
move 1 from 3 to 2
move 1 from 2 to 7
move 2 from 2 to 5
move 1 from 8 to 4
move 1 from 9 to 3
move 5 from 4 to 7
move 1 from 5 to 6
move 1 from 5 to 9
move 1 from 6 to 3
move 1 from 7 to 5
move 2 from 3 to 2
move 22 from 9 to 7
move 2 from 2 to 3
move 18 from 7 to 9
move 1 from 4 to 9
move 1 from 1 to 4
move 4 from 7 to 3
move 4 from 3 to 2
move 3 from 4 to 5
move 1 from 2 to 4
move 5 from 6 to 9
move 1 from 5 to 3
move 1 from 4 to 7
move 2 from 5 to 1
move 3 from 2 to 4
move 1 from 5 to 6
move 2 from 7 to 9
move 1 from 6 to 8
move 2 from 3 to 2
move 2 from 4 to 7
move 1 from 8 to 7
move 1 from 4 to 6
move 35 from 9 to 7
move 13 from 7 to 3
move 1 from 2 to 7
move 1 from 2 to 5
move 1 from 5 to 8
move 1 from 8 to 5
move 8 from 7 to 3
move 1 from 6 to 4
move 6 from 3 to 9
move 1 from 1 to 9
move 1 from 4 to 1
move 14 from 9 to 8
move 1 from 5 to 7
move 16 from 3 to 2
move 2 from 1 to 2
move 1 from 9 to 2
move 1 from 8 to 1
move 1 from 1 to 3
move 7 from 2 to 9
move 6 from 9 to 8
move 1 from 3 to 4
move 3 from 7 to 6
move 2 from 2 to 1
move 1 from 4 to 7
move 2 from 2 to 5
move 1 from 9 to 6
move 2 from 2 to 5
move 2 from 6 to 2
move 4 from 5 to 4
move 5 from 2 to 6
move 1 from 1 to 7
move 1 from 1 to 2
move 13 from 8 to 1
move 2 from 8 to 4
move 19 from 7 to 4
move 3 from 1 to 6
move 11 from 4 to 3
move 2 from 7 to 9
move 4 from 2 to 5
move 2 from 9 to 5
move 1 from 7 to 4
move 2 from 5 to 7
move 4 from 3 to 4
move 3 from 4 to 1
move 3 from 5 to 1
move 9 from 6 to 4
move 1 from 7 to 9
move 1 from 7 to 5
move 10 from 1 to 4
move 1 from 9 to 6
move 1 from 6 to 8
move 32 from 4 to 5
move 7 from 5 to 4
move 27 from 5 to 9
move 5 from 3 to 2
move 3 from 2 to 8
move 1 from 6 to 2
move 8 from 4 to 9
move 1 from 2 to 9
move 8 from 8 to 6
move 2 from 4 to 3
move 1 from 2 to 3
move 15 from 9 to 8
move 4 from 1 to 4
move 3 from 4 to 8
move 6 from 9 to 7
move 1 from 4 to 9
move 8 from 8 to 2
move 2 from 1 to 9
move 2 from 7 to 9
move 10 from 8 to 3
move 6 from 2 to 6
move 2 from 3 to 2
move 6 from 6 to 3
move 1 from 7 to 5
move 8 from 3 to 2
move 4 from 3 to 2
move 1 from 3 to 5
move 6 from 6 to 1
move 4 from 3 to 7
move 2 from 5 to 8
move 3 from 7 to 5
move 6 from 1 to 7
move 1 from 3 to 4
move 1 from 3 to 9
move 10 from 7 to 4
move 8 from 2 to 8
move 11 from 9 to 5
move 11 from 4 to 1
move 5 from 2 to 6
move 3 from 2 to 7
move 11 from 1 to 6
move 1 from 5 to 6
move 8 from 5 to 4
move 19 from 6 to 7
move 3 from 7 to 9
move 3 from 5 to 4
move 1 from 2 to 5
move 3 from 5 to 7
move 8 from 9 to 6
move 2 from 4 to 1
move 1 from 1 to 9
move 2 from 9 to 7
move 6 from 6 to 2
move 2 from 4 to 6
move 4 from 8 to 6
move 1 from 8 to 1
move 7 from 6 to 7
move 1 from 9 to 4
move 5 from 8 to 4
move 3 from 2 to 6
move 4 from 6 to 4
move 2 from 9 to 6
move 3 from 2 to 9
move 16 from 4 to 8
move 1 from 6 to 8
move 2 from 9 to 5
move 1 from 9 to 7
move 2 from 5 to 2
move 1 from 4 to 6
move 2 from 2 to 5
move 1 from 9 to 6
move 3 from 7 to 3
move 7 from 7 to 8
move 2 from 7 to 1
move 3 from 8 to 5
move 3 from 6 to 2
move 4 from 7 to 4
move 1 from 5 to 1
move 1 from 5 to 7
move 3 from 3 to 4
move 5 from 1 to 4
move 16 from 7 to 2
move 5 from 4 to 7
move 19 from 8 to 1
move 11 from 2 to 9
move 11 from 9 to 6
move 2 from 1 to 6
move 2 from 4 to 1
move 5 from 4 to 6
move 1 from 5 to 9
move 1 from 9 to 6
move 2 from 2 to 6
move 1 from 5 to 4
move 8 from 6 to 5
move 16 from 1 to 6
move 1 from 4 to 9
move 3 from 2 to 9
move 2 from 2 to 5
move 2 from 5 to 8
move 4 from 8 to 4
move 4 from 9 to 7
move 2 from 1 to 3
move 5 from 6 to 4
move 21 from 6 to 2
move 9 from 7 to 3
move 1 from 1 to 2
move 1 from 5 to 3
move 23 from 2 to 7
move 1 from 7 to 5
move 3 from 6 to 1
move 9 from 4 to 5
move 11 from 7 to 1
move 2 from 3 to 4
move 1 from 3 to 7
move 1 from 4 to 1
move 10 from 1 to 6
move 5 from 7 to 1
move 3 from 1 to 4
move 7 from 1 to 7
move 4 from 3 to 8
move 4 from 7 to 4
move 5 from 7 to 3
move 2 from 4 to 9
move 1 from 8 to 1
move 4 from 4 to 1
move 1 from 6 to 1
move 1 from 6 to 5
move 16 from 5 to 1
move 2 from 5 to 7
move 1 from 5 to 6
move 2 from 8 to 2
move 1 from 7 to 9
move 3 from 9 to 5
move 2 from 5 to 4
move 6 from 7 to 1
move 3 from 4 to 7
move 1 from 8 to 6
move 5 from 1 to 4
move 1 from 6 to 1
move 19 from 1 to 5
move 1 from 7 to 6
move 9 from 3 to 1
move 6 from 6 to 5
move 4 from 6 to 9
move 3 from 9 to 4
move 13 from 1 to 4
move 1 from 3 to 1
move 2 from 5 to 1
move 1 from 2 to 3
move 1 from 3 to 9
move 4 from 5 to 4
move 1 from 2 to 3
move 1 from 3 to 5
move 1 from 9 to 1
move 1 from 9 to 5
move 19 from 4 to 7
move 4 from 1 to 6
move 5 from 4 to 3
move 3 from 6 to 1
move 1 from 6 to 8
move 2 from 1 to 6
move 2 from 1 to 7
move 2 from 6 to 3
move 2 from 3 to 1
move 8 from 7 to 6
move 5 from 3 to 9
move 2 from 4 to 9
move 2 from 6 to 8
move 10 from 7 to 2
move 7 from 2 to 9
move 1 from 8 to 9
move 1 from 1 to 2
move 2 from 9 to 3
move 2 from 8 to 7
move 1 from 1 to 6
move 1 from 2 to 8
move 2 from 2 to 5
move 4 from 5 to 7
move 5 from 6 to 1
move 1 from 3 to 4`;

// console.log(advent5a(input1));

function advent5b(input: string): string {
    const [initialState, instructions] = input.split('\n\n').map((x) => x.split('\n'));

    // stack labels are the last line of initialState
    const stackLabels = last(initialState);
    console.log({ stackLabels });

    const stackPositions: Array<{ label: string; position: number }> = [];
    for (let i = 0; i < stackLabels.length; i++) {
        const char = stackLabels[i];
        if (char !== ' ') {
            console.log('found label', char, 'at position', i);
            stackPositions.push({
                label: char,
                position: i,
            });
        }
    }
    console.log({ stackPositions });

    const stacks = stackPositions.map((x) => new Stack<string>(x.label, x.position));

    const unparsedSacks = initial(initialState);
    for (let row = unparsedSacks.length - 1; row >= 0; row--) {
        const rowString = unparsedSacks[row];
        stacks.forEach((stack) => {
            const char = rowString[stack.location];
            if (char && char !== ' ') {
                console.log('found', char, 'at', stack.name, stack.location);
                stack.push(char);
            }
        });
    }
    console.log('Before', {
        initialState,
        instructions,
        stacks: stacks.map((x) => x.toString()),
        stackLabels,
    });
    instructions.forEach((rawLine) => {
        const instruction = parseInstruction(rawLine);

        console.log('parsedInstruction', instruction);

        const fromStack = stacks[instruction.from - 1];
        const toStack = stacks[instruction.to - 1];

        console.log(
            `moving #${instruction.count} ${fromStack.peekMany(instruction.count)} from ${fromStack.name} to ${
                toStack.name
            }`,
        );
        const item = fromStack.popMany(instruction.count);
        toStack.pushMany(item);

        console.log({
            stacks: stacks.map((x) => x.toString()),
        });
    });

    console.log('After', {
        initialState,
        instructions,
        stacks: stacks.map((x) => x.toString()),
        stackLabels,
    });

    return stacks.map((x) => x.peek()).join('');
}

// console.log(advent5b(testInput1));

console.log(advent5b(input1));
