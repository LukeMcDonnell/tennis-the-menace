import {Player} from "./Player";

export class Match {
    public id: string;
    private players: [Player, Player];

    private points: [number, number] = [0, 0];
    private games: [number, number] = [0, 0];
    private sets: [number, number] = [0, 0];
    private winner?: 0 | 1;

    constructor(id: string, p0: Player, p1: Player) {
        this.id = id;
        this.players = [p0, p1];
    }

    public getMatchSummary(): string {
        if (this.winner === undefined) {
            return 'Match not completed';
        }

        const winnerName = this.players[this.winner].name;
        const loserName = this.players[this.winner ^ 1].name;
        const winnerSets = this.sets[this.winner];
        const loserSets = this.sets[this.winner ^ 1];

        return `${winnerName} defeated ${loserName} \n${winnerSets} sets to ${loserSets}`
    }

    public point(scorerId: 0 | 1): void {
        if (this.winner !== undefined) {
            // TODO: we're assuming that our input file only includes complete match statistics and nothing more, ie:
            //      no additional points recorded after the match is complete. If that's not the case then we should
            //      handle this edge case more carefully.
            console.warn('Point added to already completed match. Ignoring point');
            return;
        }

        // increment player tallies
        this.players[scorerId].pointsWon ++;
        this.players[scorerId ^ 1].pointsLost ++;

        // increment the match tally
        const scorer = ++this.points[scorerId];
        const opponent = this.points[scorerId ^ 1];

        // evaluate point score and award game
        if (scorer >= 4 && (scorer - opponent) >= 2) {
            this.game(scorerId);
            this.points = [0, 0];
        }
    }

    private game(scorerId: 0 | 1): void {
        this.players[scorerId].gamesWon ++;
        this.players[scorerId ^ 1].gamesLost ++;
        const scorer = ++this.games[scorerId];

        if (scorer === 6) {
            this.set(scorerId);
            this.games = [0, 0];
        }
    }

    private set(scorerId: 0 | 1): void {
        this.players[scorerId].setsWon ++;
        this.players[scorerId ^ 1].setsLost ++;
        const scorer = ++this.sets[scorerId];

        if (scorer === 2) {
            this.match(scorerId);
        }
    }

    private match(scorerId: 0 | 1): void {
        this.players[scorerId].matchesWon ++;
        this.players[scorerId ^ 1].matchesLost ++;
        this.winner = scorerId;
    }
}