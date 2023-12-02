import { readFile } from 'node:fs/promises';

const numberify = s => {
    const numbers = ['one','two','three','four','five','six','seven','eight','nine'];
    const characters = s.split('');
    for (let i = 0; i < numbers.length; i++) {
        for (const { index } of s.matchAll(numbers[i])) {
            characters[index] = i + 1;
        }
    }
    return characters.join('');
}


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


// PART 2

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
for (const originalLine of lines) {
    // console.log('originalLine', originalLine);
    const line = numberify(originalLine);
    // console.log('new', line);


    const chars = line.split('');
    let first, last;
    for (const char of chars) {
        if (char.match(/[0-9]/)) {
            if (!first) first = char;
            last = char;
        }
    }
    const value = parseInt(`${first}${last}`);
    // console.log('value', value);
    total2 += value;

    // let firstLine = originalLine;
    // // for (let i = 0; i < firstLine.length; i++) {
    // //     for (const [index, number] of numbers.entries()) {
    // //         if (firstLine[i].match(/[0-9]/)) continue;
    // //         if (firstLine.substring(i, i + number.length) === number) {
    // //             firstLine = firstLine.replace(number, `${index + 1}`);
    // //         }
    // //     }
    // // }
    // // console.log('new1', firstLine);

    // let lastLine = originalLine;
    // for (let i = lastLine.length - 1; i >= 0; i--) {
    //     if (!isNaN(lastLine[i])) continue;
    //     for (const [index, number] of numbers.entries()) {
    //         if (lastLine.substring(i - number.length + 1, i + 1) === number) {
    //             lastLine = lastLine.replace(number, `${index + 1}`);
    //             i = i - number.length;
    //         }
    //     }
    // }
    // console.log('new2', lastLine);

    // const first = firstLine.match(/[0-9]/)[0];
    // const last = [...lastLine].reverse().join('').match(/[0-9]/)[0];
    // const value = parseInt(`${first}${last}`);
    // console.log('value', value);
    // total2 += value;
}
console.log(`Part 2: ${total2}`);
