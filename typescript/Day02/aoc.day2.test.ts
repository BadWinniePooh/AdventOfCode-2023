import {expect, it, test} from "bun:test";
import * as fs from 'fs';

class Game {
    getSetsOfCubes(game: string) {
        return game.split(';').map((set) => set.trim());
    }

    isPossible(game: string, limitation: Map<string, number>) {
        var sets = this.getSetsOfCubes(game);
        var possible = true;
        sets.forEach((set) => {
            var cubes = this.getNumberOfCubesInSet(set);
            cubes.forEach((value, key) => {
                if (value > limitation.get(key)!) {
                    possible = false;
                }
            });
        });
        return possible;
    }

    getNumberOfCubesInSet(set: string) {
        var cubes = new Map<string, number>(
            [
                ['red', 0],
                ['green', 0],
                ['blue', 0]
            ]
        );
        set.split(',').forEach((cube) => {
            var color = cube.trim().split(' ')[1];
            var number = parseInt(cube.trim().split(' ')[0]);
            cubes.set(color, number);
        });
        return cubes;
    }

    getGameId(game: string) {
        return parseInt(game.split(':')[0].split(' ')[1])
    }

    getSumOfPossibleGames(input: string, limitation: Map<string, number>) {
        var games = input.split('\n');
        var gameIds = games.map((game) => this.getGameId(game));
        var gameSets = games.map((game) => this.getGame(game));
        var possibleGames = 0;

        gameIds.forEach((gameId) => {
            if (this.isPossible(gameSets[gameId-1], limitation)) {
                possibleGames += gameId;
            }
        });
        return possibleGames;
    }

    getGame(input: string) {
        return input.split(':')[1].trim();
    }
}

const game = new Game();
const limitation = new Map<string, number>(
    [
        ['red', 12],
        ['green', 13],
        ['blue', 14]
    ]
);

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

test('Get Solution of Day02', () => {
    var input = fs.readFileSync('typescript/Day02/testData.txt', 'utf8');
    var actual = game.getSumOfPossibleGames(input, limitation);
    expect(actual).toBe(0);
});