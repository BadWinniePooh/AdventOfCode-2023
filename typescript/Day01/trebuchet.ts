export class Trebuchet {
    calibrate(input: string) {
        var matches = input.match(/[0-9]/gm);
        var firstDigit = matches ? matches[0] : 'error';
        var lastDigit = matches ? matches[matches.length - 1] : 'error';
        return parseInt(firstDigit + lastDigit);
    }

    calibrationSum(input: string[]) {
        var sum = 0;
        input.forEach(element => {
            sum += this.calibrate(element)
        });
        return sum;
    }
}