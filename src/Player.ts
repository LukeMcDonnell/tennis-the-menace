export class Player {
    name: string;

    pointsWon: number = 0;
    pointsLost: number = 0;

    gamesWon: number = 0;
    gamesLost: number = 0;

    setsWon: number = 0;
    setsLost: number = 0;

    matchesWon: number = 0;
    matchesLost: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    getPointsSummary(): string {
        return `${this.pointsWon} ${this.pointsLost}`;
    }

    getGamesSummary(): string {
        return `${this.gamesWon} ${this.gamesLost}`;
    }

    getSetsSummary(): string {
        return `${this.setsWon} ${this.setsLost}`;
    }

    getMatchesSummary(): string {
        return `${this.matchesWon} ${this.matchesLost}`;
    }

}