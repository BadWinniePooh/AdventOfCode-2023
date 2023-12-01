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
])(`number only calibration value from %s should be %i`, (input: string, expected: number) => {
    var actual = trebuchet.calibrate(input);
    expect(actual).toBe(expected);
})

test('sum of number only calibration values should be 142', () => {
    var input = [
        '1abc2'
        , 'pqr3stu8vwx'
        , 'a1b2c3d4e5f'
        , 'treb7uchet'];

    var actual = trebuchet.calibrationSum(input);
    expect(actual).toBe(142);
});

it.each([
    ['one', 11]
    ,['two', 22]
    ,['three4', 34]
    ,['4three', 43]
    ,['4onethree', 43]
])(`text calibration value from %s should be %i`, (input: string, expected: number) => {
    var actual = trebuchet.calibrate(input);
    expect(actual).toBe(expected);
});

test('sum of text calibration values should be 281', () => {
    var input = [
        'two1nine'
        ,'eightwothree'
        ,'abcone2threexyz'
        ,'xtwone3four'
        ,'4nineeightseven2'
        ,'zoneight234'
        ,'7pqrstsixteen'];

    var actual = trebuchet.calibrationSum(input);
    expect(actual).toBe(281);
});



test('Solution of Day01 Part 1', () => {
    var input = fs.readFileSync('typescript/Day01/testData.txt', 'utf8').split('\n');
    var actual = trebuchet.calibrationSum(input);
    //expect(actual).toBe(0);
});