export class Game {
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
            if (this.isPossible(gameSets[gameId - 1], limitation)) {
                possibleGames += gameId;
            }
        });
        return possibleGames;
    }

    getGame(input: string) {
        return input.split(':')[1].trim();
    }

    getLimitation(gameSets: string) {
        var limitation = new Map<string, number>(
            [
                ['red', 0],
                ['green', 0],
                ['blue', 0]
            ]
        );
        this.getSetsOfCubes(gameSets).forEach((set) => {
            var cubes = this.getNumberOfCubesInSet(set);
            cubes.forEach((value, key) => {
                if(limitation.get(key)! < value){
                    limitation.set(key, value);
                }
            });
        });
        return limitation;
    }

    getPowerOfCubes(gameSets: string) {
        var limitation = this.getLimitation(gameSets);
        return limitation.get('red')! * limitation.get('green')! * limitation.get('blue')!;
    }

    getSumOfPowerOfCubes(data: string) {
        var games = data.split('\n');
        var gameSets = games.map((game) => this.getGame(game));
        var sumOfPowerOfCubes = 0;
        gameSets.forEach((gameSet) => {
            var powerOfCubes = this.getPowerOfCubes(gameSet);
            sumOfPowerOfCubes += powerOfCubes;
        });
        return sumOfPowerOfCubes;
    }
}