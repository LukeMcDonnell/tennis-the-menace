"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        this.pointsWon = 0;
        this.pointsLost = 0;
        this.gamesWon = 0;
        this.gamesLost = 0;
        this.setsWon = 0;
        this.setsLost = 0;
        this.matchesWon = 0;
        this.matchesLost = 0;
        this.name = name;
    }
    getPointsSummary() {
        return `${this.pointsWon} ${this.pointsLost}`;
    }
    getGamesSummary() {
        return `${this.gamesWon} ${this.gamesLost}`;
    }
    getSetsSummary() {
        return `${this.setsWon} ${this.setsLost}`;
    }
    getMatchesSummary() {
        return `${this.matchesWon} ${this.matchesLost}`;
    }
}
exports.Player = Player;
