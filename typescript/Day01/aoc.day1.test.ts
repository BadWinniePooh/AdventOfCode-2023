import {expect, it, test} from "bun:test";
import * as fs from 'fs';
import {Trebuchet} from "./trebuchet.ts";

const trebuchet = new Trebuchet();

it.each([
    ['1abc2', 12]
    ,['1a2b2c2', 12]
    ,['a2bc', 22]
    ,['1abc2', 12]
    , ['pqr3stu8vwx', 38]
    , ['a1b2c3d4e5f', 15]
    , ['treb7uchet', 77]
    , ['53abc1', 51]
])(`calibration value from %s should be %i`, (input: string, expected: number) => {
    var actual = trebuchet.calibrate(input);
    expect(actual).toBe(expected);
})

test('sum of calibration values should be 142', () => {
    var input = [
        '1abc2'
        , 'pqr3stu8vwx'
        , 'a1b2c3d4e5f'
        , 'treb7uchet'];

    var actual = trebuchet.calibrationSum(input);
    expect(actual).toBe(142);
});

test('Solution of Day01 Part 1', () => {
    var input = fs.readFileSync('typescript/Day01/testData.txt', 'utf8').split('\n');
    var actual = trebuchet.calibrationSum(input);
    expect(actual).toBe(54561);
});