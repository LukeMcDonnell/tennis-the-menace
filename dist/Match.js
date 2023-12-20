"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
class Match {
    constructor(id, p0, p1) {
        this.points = [0, 0];
        this.games = [0, 0];
        this.sets = [0, 0];
        this.id = id;
        this.players = [p0, p1];
    }
    getMatchSummary() {
        if (this.winner === undefined) {
            return 'Match not completed';
        }
        const winnerName = this.players[this.winner].name;
        const loserName = this.players[this.winner ^ 1].name;
        const winnerSets = this.sets[this.winner];
        const loserSets = this.sets[this.winner ^ 1];
        return `${winnerName} defeated ${loserName} \n${winnerSets} sets to ${loserSets}`;
    }
    point(scorerId) {
        if (this.winner !== undefined) {
            // TODO: we're assuming that our input file only includes complete match statistics and nothing more, ie:
            //      no additional points recorded after the match is complete. If that's not the case then we should
            //      handle this edge case more carefully.
            console.warn('Point added to already completed match. Ignoring point');
            return;
        }
        // increment player tallies
        this.players[scorerId].pointsWon++;
        this.players[scorerId ^ 1].pointsLost++;
        // increment the match tally
        const scorer = ++this.points[scorerId];
        const opponent = this.points[scorerId ^ 1];
        // evaluate point score and award game
        if (scorer >= 4 && (scorer - opponent) >= 2) {
            this.game(scorerId);
            this.points = [0, 0];
        }
    }
    game(scorerId) {
        this.players[scorerId].gamesWon++;
        this.players[scorerId ^ 1].gamesLost++;
        const scorer = ++this.games[scorerId];
        if (scorer === 6) {
            this.set(scorerId);
            this.games = [0, 0];
        }
    }
    set(scorerId) {
        this.players[scorerId].setsWon++;
        this.players[scorerId ^ 1].setsLost++;
        const scorer = ++this.sets[scorerId];
        if (scorer === 2) {
            this.match(scorerId);
        }
    }
    match(scorerId) {
        this.players[scorerId].matchesWon++;
        this.players[scorerId ^ 1].matchesLost++;
        this.winner = scorerId;
    }
}
exports.Match = Match;
