import { readFile } from 'node:fs/promises';

const data = await readFile('./data/day2.txt', 'utf-8');
const lines = data.split('\n').filter(l => Boolean(l));

// PART 1

const available = {
    red: 12,
    green: 13,
    blue: 14
};

const possibleGames = [];
for (const line of lines) {
    const [game, results] = line.split(':');
    const rounds = results.split(';');
    let possible = true;
    for (const round of rounds) {
        for (const color of Object.keys(available)) {
            const pattern = new RegExp(`([0-9]+) ${color}`);
            const match = round.match(pattern);
            if (!match) continue;
            if (parseInt(match[1]) > available[color]) {
                possible = false;
                break;
            }
        }
    }
    if (possible) possibleGames.push(parseInt(game.split(' ')[1]));
}

const total1 = possibleGames.reduce((acc, cur) => acc + cur, 0);
console.log(`Part #1: ${total1}`);

// PART 2

const powers = [];
for (const line of lines) {
    const [game, results] = line.split(':');
    const rounds = results.split(';');
    const max = { red: 0, green: 0, blue: 0 };
    for (const round of rounds) {
        for (const color of Object.keys(max)) {
            const pattern = new RegExp(`([0-9]+) ${color}`);
            const match = round.match(pattern);
            if (!match) continue;
            const count = parseInt(match[1]);
            if (count > max[color]) max[color] = count;
        }
    }
    const power = max.red * max.green * max.blue;
    powers.push(power);
}

const total2 = powers.reduce((acc, cur) => acc + cur, 0);
console.log(`Part #2: ${total2}`);
