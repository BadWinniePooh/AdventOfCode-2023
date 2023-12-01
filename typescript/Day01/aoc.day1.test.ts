import { expect, it, test } from "bun:test";
import * as fs from 'fs';

function getCalibrationFromString(input: string) {
    var matches = input.match(/[0-9]/gm);
    var firstDigit = matches ? matches[0] : 'error';
    var lastDigit = matches ? matches[matches.length - 1] : 'error';
    return parseInt(firstDigit + lastDigit);
}


it.each([
    ['1abc2', 12]
    ,['1a2b2c2', 12]
    ,['a2bc', 22]
    ,['1abc2', 12]
    , ['pqr3stu8vwx', 38]
    , ['a1b2c3d4e5f', 15]
    , ['treb7uchet', 77]
    , ['53hvhgchljnlxqjsgrhxgf1zfoureightmlhvvv', 51]
])(`calibration value from %s should be %i`, (input: string, expected: number) => {
    var actual = getCalibrationFromString(input);
    expect(actual).toBe(expected);
})

function getSumFromCallibrations(input: string[]) {
    var sum = 0;
    input.forEach(element => {
        sum += getCalibrationFromString(element)
    });
    return sum;
}

test('sum of calibration values should be 142', () => {
    var input = [
        '1abc2'
        , 'pqr3stu8vwx'
        , 'a1b2c3d4e5f'
        , 'treb7uchet'];

    var actual = getSumFromCallibrations(input);
    expect(actual).toBe(142);
});

test('read from file', () => {
    var input = fs.readFileSync('typescript/Day01/testData.txt', 'utf8').split('\n');
    var actual = getSumFromCallibrations(input);
    expect(actual).toBe(54561);
});