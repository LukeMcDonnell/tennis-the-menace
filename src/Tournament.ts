import * as fs from 'fs';
import {Match} from "./Match";
import {Player} from "./Player";

export class Tournament {
    public readonly matches: { [key: string]: Match };
    public readonly players: { [key: string]: Player };

    queries: { [key: string]: (a: string) => string } = {
        "Score Match": (matchId: string): string => this.matches[matchId]?.getMatchSummary() ?? 'MatchID not found',
        "Points Player": (playerId: string): string => this.players[playerId]?.getPointsSummary() ?? 'Player Name not found',
        "Games Player": (playerId: string): string => this.players[playerId]?.getGamesSummary() ?? 'Player Name not found',
        "Sets Player": (playerId: string): string => this.players[playerId]?.getSetsSummary() ?? 'Player Name not found',
        "Matches Player": (playerId: string): string => this.players[playerId]?.getMatchesSummary() ?? 'Player Name not found',
    }

    constructor() {
        this.matches = {};
        this.players = {};
    }

    public processFile(filePath: string): void {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const matches = fileContent.trim().split('Match: ').filter(e => e).map(m => m.trim().split('\n'));

        for (let match of matches) {
            const header = this.extractHeader(match);
            this.matches[header.id] =  new Match(header.id, header.player0, header.player1);

            for (let scorer of match) {
                const parsedScorer = parseInt(scorer);
                if (parsedScorer === 0 || parsedScorer === 1) {
                    this.matches[header.id].point(parsedScorer);
                }
            }
        }
    }

    public query(query: string): string {
        query = query.trim();
        const resolvedQuery = Object.keys(this.queries).find(q => query.startsWith(q));

        if (resolvedQuery) {
            const arg = query.replace(resolvedQuery, '').trim();
            return this.queries[resolvedQuery](arg) + '\n';
        }

        return 'Unknown query \n';
    }


    private extractHeader(match: string[]): {id: string, player0: Player, player1: Player} {
        const header = match.splice(0, 2)
        const players = this.resolvePlayers(header[1]);
        return {
            id: header[0],
            player0: players[0],
            player1: players[1],
        };
    }

    private resolvePlayers(line: string): [Player, Player] {
        const names = line.split(' vs ');
        if (names.length === 2) {
            return [
                this.players[names[0]] ?? (this.players[names[0]] = new Player(names[0])),
                this.players[names[1]] ?? (this.players[names[1]] = new Player(names[1])),
            ];
        } else {
            throw Error('Unable to extract player information from header. Perhaps the file is corrupted?')
        }
    }

}