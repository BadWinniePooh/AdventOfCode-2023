import {expect, it, test} from "bun:test";
import * as fs from 'fs';
import {Game} from "./game.ts";

const game = new Game();
const limitation = new Map<string, number>(
    [
        ['red', 12],
        ['green', 13],
        ['blue', 14]
    ]
);

// Part One

it.each([
    ['3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', ['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green']],
    ['1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', ['1 blue, 2 green', '3 green, 4 blue, 1 red', '1 green, 1 blue']],
    ['8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', ['8 green, 6 blue, 20 red', '5 blue, 4 red, 13 green', '5 green, 1 red']],
    ['1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', ['1 green, 3 red, 6 blue', '3 green, 6 red', '3 green, 15 blue, 14 red']],
    ['6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',['6 red, 1 blue, 3 green', '2 blue, 1 red, 2 green']],
])('a game %s should return sets of cubes', (input: string, expected: string[]) => {
    var actual = game.getSetsOfCubes(input);
    expect(actual).toStrictEqual(expected);
});

it.each([
    ['3 blue, 4 red', new Map([['red', 4],['green', 0],['blue', 3]])],
    ['1 red, 2 green, 6 blue', new Map([['red', 1],['green', 2],['blue', 6]])],
    ['2 green', new Map([['red', 0],['green', 2],['blue', 0]])],
    ['1 blue, 2 green', new Map([['red', 0],['green', 2],['blue', 1]])]
])('a game %s should return sets of cubes', (input: string, expected: Map<string,number>) => {
    var actual = game.getNumberOfCubesInSet(input);
    expect(actual.get('red')).toBe(expected.get('red')!);
    expect(actual.get('green')).toBe(expected.get('green')!);
    expect(actual.get('blue')).toBe(expected.get('blue')!);
});

it.each([
    ['3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', true],
    ['1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', true],
    ['8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', false],
    ['1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', false],
    ['6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', true],
])('a game %s should be possible if it fits to the limitation', (input: string, expected: boolean) => {
    var actual = game.isPossible(input, limitation);
    expect(actual).toBe(expected);
});

it.each([
    ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 1],
    ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', 2]
])('%s should return the Game ID %i', (input: string, expected: number) => {
    var actual = game.getGameId(input)
    expect(actual).toBe(expected);
});

it.each([
    ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'],
    ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', '1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue']
])('%s should return the sets without the Game', (input: string, expected: string) => {
    var actual = game.getGame(input)
    expect(actual).toBe(expected);
});


test('Sum of possible games should be 8', () => {
    var input =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
        'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';

    var actual = game.getSumOfPossibleGames(input, limitation);
    expect(actual).toBe(8);
});

// Part Two

it.each([
    ['3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', new Map([['red', 4],['green', 2],['blue', 6]])],
    ['1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', new Map([['red', 1],['green', 3],['blue', 4]])],
    ['8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', new Map([['red', 20],['green', 13],['blue', 6]])],
    ['1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', new Map([['red', 14],['green', 3],['blue', 15]])],
    ['6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', new Map([['red', 6],['green', 3],['blue', 2]])],
])('get limitation with fewest number of cubes of each color', (input: string, expected: Map<string,number>) => {
    var actual = game.getLimitation(input);
    expect(actual.get('red')).toBe(expected.get('red')!);
    expect(actual.get('green')).toBe(expected.get('green')!);
    expect(actual.get('blue')).toBe(expected.get('blue')!);
});

it.each([
    ['3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 48],
    ['1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', 12],
    ['8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 1560],
    ['1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', 630],
    ['6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', 36],
])('get power of a set of cubes', (input: string, expected: number) => {
    var actual = game.getPowerOfCubes(input);
    expect(actual).toBe(expected);
});

test('Sum of power of all cubes should be 2286', () => {
    var input =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
        'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';

    var actual = game.getSumOfPowerOfCubes(input);
    expect(actual).toBe(2286);
});

// Solution Test is intentionally failing and thus commented out

test('Get Solution of Day02', () => {
    var input = fs.readFileSync('typescript/Day02/testData.txt', 'utf8');
    var partOne = game.getSumOfPossibleGames(input, limitation);
    var partTwo = game.getSumOfPowerOfCubes(input);
    // Uncomment to reveal answer
    //expect(partOne).toBe(0);
    //expect(partTwo).toBe(0);
});