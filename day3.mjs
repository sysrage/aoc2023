import { readFile } from 'node:fs/promises';

const data = await readFile('./data/day3.txt', 'utf-8');
// const data = `467..114..\n
// ...*......\n
// ..35..633.\n
// ......#...\n
// 617*......\n
// .....+.58.\n
// ..592.....\n
// ......755.\n
// ...$.*....\n
// .664.598..\n
// ..........\n
// ..5.2.3.1.\n
// ..........\n`;

const lines = data.split('\n').filter(l => Boolean(l));

const numbers = [];
const symbols = [];

for (const [y, line] of lines.entries()) {
    const numMatches = line.matchAll(/[0-9]+/g);
    for (const match of numMatches) {
        numbers.push({ number: match[0], x: match.index, y });
    }
    const symMatches = line.matchAll(/[^0-9.]/g);
    for (const match of symMatches) {
        symbols.push({ symbol: match[0], x: match.index, y });
    }

}
// console.log('numbers', numbers);
// console.log('symbols', symbols);

const touchingNumbers = [];
for (const number of numbers) {
    let touching;
    const tl = { x: number.x - 1, y: number.y - 1 };
    const tr = { x: number.x + number.number.length, y: number.y - 1 };
    const bl = { x: number.x - 1, y: number.y + 1 };
    const br = { x: number.x + number.number.length, y: number.y + 1 };

    for (let i = tl.x; i <= tr.x; i++) {
        const symbol = symbols.find(s => s.x === i && s.y === tl.y);
        if (symbol) touching = symbol;
    }

    const leftSymbol = symbols.find(s => s.x === number.x - 1 && s.y === number.y);
    if (leftSymbol) touching = leftSymbol;

    const rightSymbol = symbols.find(s => s.x === number.x + number.number.length && s.y === number.y);
    if (rightSymbol) touching = true;

    for (let i = bl.x; i <= br.x; i++) {
        const symbol = symbols.find(s => s.x === i && s.y === bl.y);
        if (symbol) touching = symbol;
    }
    if (touching) touchingNumbers.push({ number: number.number, symbol: touching });

    // console.log('number', number);
    // console.log({ tl, tr, bl, br });
    // console.log('touching', touching);
}

// console.log('touchingNumbers', touchingNumbers)
console.log(`Part 1: ${touchingNumbers.reduce((acc, cur) => acc += parseInt(cur.number), 0)}`);

const ratios = [];
for (const symbol of symbols.filter(s => s.symbol === '*')) {

    const touched = touchingNumbers.filter(n => n.symbol.x === symbol.x && n.symbol.y === symbol.y);
    if (touched.length === 2) {
        const ratio = touched[0].number * touched[1].number;
        ratios.push(ratio);
    }
    // console.log('symbol', symbol);
    // console.log('touched', touched);
}
console.log(`Part 2: ${ratios.reduce((acc, cur) => acc += cur, 0)}`);
