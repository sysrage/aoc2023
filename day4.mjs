import { readFile } from 'node:fs/promises';

const data = await readFile('./data/day4.txt', 'utf-8');

const lines = data.split('\n').filter(l => Boolean(l));

let totalPoints = 0;
const cards = {};
for (const line of lines) {
    const [left, right] = line.split(':');
    const card = left.match(/([0-9]+)/)[1];
    const [left2, right2] = right.split('|');
    const winners = left2.split(' ').filter(n => Boolean(n));
    const numbers = right2.split(' ').filter(n => Boolean(n));
    const matching = numbers.filter(n => winners.includes(n));

    cards[parseInt(card)] = { numbers, matching };

    // console.log(card);
    // console.log('win', winners);
    // console.log('num', numbers);
    // console.log('matches', matching.length);
    // console.log('');

    let points = 0;
    for (let i = 0; i < matching.length; i++) {
        if (points === 0) {
            points = 1;
        } else {
            points = points * 2;
        }
    }
    totalPoints += points;
}

console.log(`Part 1: ${totalPoints}`);

const cardCounts = Object.fromEntries(Object.keys(cards).map(c => [c, 1]));
console.log('cards', cards);
console.log('counts', cardCounts);

for (const cardNum of Object.keys(cards)) {
    console.log(cardNum);
}
