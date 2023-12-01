var map = new Map<string,number>(
[
    ['one', 1]
    ,['two', 2]
    ,['three', 3]
    ,['four', 4]
    ,['five', 5]
    ,['six', 6]
    ,['seven', 7]
    ,['eight', 8]
    ,['nine', 9]
    ,['zero', 0]
    ]
);

export class Trebuchet {
    calibrate(input: string) {
        var matches = input.match(/one|two|three|four|five|six|seven|eight|nine|zero|[0-9]/gm);
        var firstDigit = matches ? matches[0].length > 1 ? this.convert(matches[0]) : matches[0] : 'error'
        var lastDigit = matches ? matches[matches.length - 1].length > 1 ? this.convert(matches[matches.length - 1]) : matches[matches.length -1] : 'error';
        return parseInt(firstDigit + lastDigit);
    }

    private convert(input: string) {
        return map.get(input)!.toString();
    }

    calibrationSum(input: string[]) {
        var sum = 0;
        input.forEach(element => {
            sum += this.calibrate(element)
        });
        return sum;
    }
}