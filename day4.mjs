import { readFile } from 'node:fs/promises';

const data = await readFile('./data/day4.txt', 'utf-8');
// const data = `
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `;

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

const cardCounts = Object.fromEntries(Object.keys(cards).map(c => [parseInt(c), 1]));
// console.log('cards', cards);
// console.log('counts', cardCounts);

for (const cardNumStr of Object.keys(cards)) {
    const card = cards[cardNumStr];
    const cardNum = parseInt(cardNumStr);
    const matches = card.matching.length;
    const cardCount = cardCounts[cardNum];
    for (let i = cardNum + 1; i < cardNum + 1 + matches; i++) {
        cardCounts[i] += cardCount;
    }
}

// console.log('counts', cardCounts);
console.log(`Part 2: ${Object.values(cardCounts).reduce((acc, cur) => acc + cur, 0)}`);
