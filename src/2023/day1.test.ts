import { positionToEnd, findNumbersByText, splitWordAtPosition } from './day1';
import { expect, test, it } from 'bun:test';

test('positionToEnd', () => {
    expect(positionToEnd('Hello, World!', 0)).toBe('Hello, World!');
    expect(positionToEnd('Hello, World!', 1)).toBe('ello, World!');
    expect(positionToEnd('Hello, World!', 2)).toBe('llo, World!');
    expect(positionToEnd('Hello, World!', 3)).toBe('lo, World!');
    expect(positionToEnd('Hello, World!', 4)).toBe('o, World!');
    expect(positionToEnd('Hello, World!', 5)).toBe(', World!');
    expect(positionToEnd('Hello, World!', 6)).toBe(' World!');
    expect(positionToEnd('Hello, World!', 7)).toBe('World!');
    expect(positionToEnd('Hello, World!', 8)).toBe('orld!');
    expect(positionToEnd('Hello, World!', 9)).toBe('rld!');
    expect(positionToEnd('Hello, World!', 10)).toBe('ld!');
    expect(positionToEnd('Hello, World!', 11)).toBe('d!');
    expect(positionToEnd('Hello, World!', 12)).toBe('!');
    expect(positionToEnd('Hello, World!', 13)).toBe('');
    expect(positionToEnd('Hello, World!', 20)).toBe('');
    expect(positionToEnd('onetwothree', 0)).toBe('onetwothree');
    expect(positionToEnd('onetwothree', 1)).toBe('netwothree');
    expect(positionToEnd('onetwothree', 2)).toBe('etwothree');
});

test('findNumbersByText', () => {
    expect(findNumbersByText('123')).toEqual([1, 2, 3]);
    expect(findNumbersByText('oneX3')).toEqual([1, 3]);
    expect(findNumbersByText('two1nine')).toEqual([2, 1, 9]);
    expect(findNumbersByText('eightwothree')).toEqual([8, 2, 3]);
});

test('splitWordAtPosition', () => {
    expect(splitWordAtPosition('Hello, World!', 0)).toEqual(['', 'Hello, World!']);
    expect(splitWordAtPosition('Hello, World!', 1)).toEqual(['H', 'ello, World!']);
});
