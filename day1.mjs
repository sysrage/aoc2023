import { readFile } from 'node:fs/promises';
const data = await readFile('./data/day1.txt', 'utf-8');
const lines = data.split('\n').filter(l => Boolean(l));

let total = 0;
for (const line of lines) {
    const chars = line.split('');
    let first, last;
    for (const char of chars) {
        if (char.match(/[0-9]/)) {
            if (!first) first = char;
            last = char;
        }
    }
    const value = parseInt(`${first}${last}`);
    total += value;
}
console.log(`Part 1: ${total}`);

const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten'
];

let total2 = 0;
for (let line of lines) {
    for (const [index, number] of numbers.entries()) {
        line = line.replaceAll(number, index + 1);
    }

    const chars = line.split('');
    let first, last;
    for (const char of chars) {
        if (char.match(/[0-9]/)) {
            if (!first) first = char;
            last = char;
        }
    }
    const value = parseInt(`${first}${last}`);
    total2 += value;
}
console.log(`Part 2: ${total2}`);
