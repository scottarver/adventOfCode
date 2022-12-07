import * as fs from 'fs';
import { orderBy } from 'lodash';

process.stdout.write('\u001b[3J\u001b[1J');
console.clear();

const totalDiskSpace = 70000000;
const spaceNeeded = 30000000;

type File = {
    name: string;
    size: number;
};
class Directory {
    // public childrenFiles:File[] = [];
    public childDirs = new Map<string, Directory>();
    public childFiles = new Map<string, File>();

    constructor(public name: string, public parent?: Directory) {}

    public get path(): string {
        if (!this.parent) {
            return '/';
        }
        const allParents = this.getAllParents();
        const path = allParents
            .map((p) => p.name)
            .reverse()
            .join('/');
        return `${path}/${this.name}`;
    }
    addFile(file: File) {
        this.childFiles.set(file.name, file);
    }
    addDirectory(name: string) {
        const newDir = new Directory(name, this);
        this.childDirs.set(name, newDir);
        return newDir;
    }

    public getParent(): Directory | undefined {
        return this.parent;
    }
    public getAllParents(): Directory[] {
        if (!this.parent) {
            return [];
        }
        return [this.parent, ...this.parent.getAllParents()];
    }

    public getSize(): number {
        let total = 0;
        for (const file of this.childFiles.values()) {
            total += file.size;
        }
        for (const dir of this.childDirs.values()) {
            total += dir.getSize();
        }
        return total;
    }

    public walk(fn: (dir: Directory) => void) {
        fn(this);
        for (const dir of this.childDirs.values()) {
            dir.walk(fn);
        }
    }
}

function adventDay7(input: string): Directory {
    const lines = input.split('\n');
    let root = new Directory('');
    let pointer = root;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        console.log(`line ${i}`, line);

        const lineByWord = line.split(' ');
        console.log('lineByWord', lineByWord);

        if (lineByWord.length === 0) {
            throw new Error('Invalid line');
        }

        // is command if line starts with a $
        const isCommand = lineByWord[0].startsWith('$');
        console.log('isCommand', isCommand);
        if (isCommand) {
            const command = lineByWord[1];
            console.log('command', command);

            if (command === 'ls') {
                i = i + 1;
                let nextLine = lines[i];
                while (nextLine) {
                    const nlParsed = nextLine.split(' ');
                    console.log('nlParsed', nlParsed);
                    if (nlParsed.length === 0) {
                        throw new Error('Invalid line');
                    }

                    if (nlParsed[0] === 'dir') {
                        const dirName = nlParsed[1];
                        console.log('dirName', dirName);
                        pointer.addDirectory(dirName);
                    } else if (/\d+/.test(nlParsed[0])) {
                        const fileName = nlParsed[1];
                        const fileSize = parseInt(nlParsed[0], 10);
                        console.log('fileName', fileName);
                        console.log('fileSize', fileSize);
                        pointer.addFile({ name: fileName, size: fileSize });
                    } else {
                        i = i - 1;
                        break;
                    }

                    i = i + 1;
                    nextLine = lines[i];
                }
            } else if (command === 'cd') {
                const arg = lineByWord[2];
                console.log('cd arg', arg);
                if (arg === '/') {
                    pointer = root;
                } else if (arg === '..') {
                    pointer = pointer.getParent();
                } else {
                    pointer = pointer.childDirs.get(arg);
                }
            }
        }
    }

    console.log(root);
    root.walk((dir) => console.log(dir.path));
    console.log(root.getSize());

    console.log('\n');
    root.walk((dir) => {
        const size = dir.getSize();
        console.log(dir.path, size);
    });

    console.log('\n');
    const allDirs = [];
    let total = 0;
    root.walk((dir) => {
        const size = dir.getSize();
        allDirs.push({ path: dir.path, size });
        if (size < 100000) {
            console.log(dir.path, size);
            total += size;
        }
    });

    console.log('Part 1 total:', total);
    console.log('\n');
    console.log(orderBy(allDirs, 'size'));
    console.log('\n');

    const rootSize = root.getSize();
    const freeSpace = totalDiskSpace - rootSize;

    const bigEnoughDirs = orderBy(
        allDirs.filter((d) => d.size + freeSpace > spaceNeeded),
        'size',
    );

    console.log(orderBy(bigEnoughDirs, 'size'));

    console.log('\n');
    console.log('Part 2:', bigEnoughDirs[0]);

    return root;
}

const testInput1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

adventDay7(testInput1);

// read from day7input.txt
const input1 = fs.readFileSync(__dirname + '/day7input.txt', 'utf8');
adventDay7(input1);
