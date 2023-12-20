"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
const fs = __importStar(require("fs"));
const Match_1 = require("./Match");
const Player_1 = require("./Player");
class Tournament {
    constructor() {
        this.queries = {
            "Score Match": (matchId) => { var _a, _b; return (_b = (_a = this.matches[matchId]) === null || _a === void 0 ? void 0 : _a.getMatchSummary()) !== null && _b !== void 0 ? _b : 'MatchID not found'; },
            "Points Player": (playerId) => { var _a, _b; return (_b = (_a = this.players[playerId]) === null || _a === void 0 ? void 0 : _a.getPointsSummary()) !== null && _b !== void 0 ? _b : 'Player Name not found'; },
            "Games Player": (playerId) => { var _a, _b; return (_b = (_a = this.players[playerId]) === null || _a === void 0 ? void 0 : _a.getGamesSummary()) !== null && _b !== void 0 ? _b : 'Player Name not found'; },
            "Sets Player": (playerId) => { var _a, _b; return (_b = (_a = this.players[playerId]) === null || _a === void 0 ? void 0 : _a.getSetsSummary()) !== null && _b !== void 0 ? _b : 'Player Name not found'; },
            "Matches Player": (playerId) => { var _a, _b; return (_b = (_a = this.players[playerId]) === null || _a === void 0 ? void 0 : _a.getMatchesSummary()) !== null && _b !== void 0 ? _b : 'Player Name not found'; },
        };
        this.matches = {};
        this.players = {};
    }
    processFile(filePath) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const matches = fileContent.trim().split('Match: ').filter(e => e).map(m => m.trim().split('\n'));
        for (let match of matches) {
            const header = this.extractHeader(match);
            this.matches[header.id] = new Match_1.Match(header.id, header.player0, header.player1);
            for (let scorer of match) {
                const parsedScorer = parseInt(scorer);
                if (parsedScorer === 0 || parsedScorer === 1) {
                    this.matches[header.id].point(parsedScorer);
                }
            }
        }
    }
    query(query) {
        query = query.trim();
        const resolvedQuery = Object.keys(this.queries).find(q => query.startsWith(q));
        if (resolvedQuery) {
            const arg = query.replace(resolvedQuery, '').trim();
            return this.queries[resolvedQuery](arg) + '\n';
        }
        return 'Unknown query \n';
    }
    extractHeader(match) {
        const header = match.splice(0, 2);
        const players = this.resolvePlayers(header[1]);
        return {
            id: header[0],
            player0: players[0],
            player1: players[1],
        };
    }
    resolvePlayers(line) {
        var _a, _b;
        const names = line.split(' vs ');
        if (names.length === 2) {
            return [
                (_a = this.players[names[0]]) !== null && _a !== void 0 ? _a : (this.players[names[0]] = new Player_1.Player(names[0])),
                (_b = this.players[names[1]]) !== null && _b !== void 0 ? _b : (this.players[names[1]] = new Player_1.Player(names[1])),
            ];
        }
        else {
            throw Error('Unable to extract player information from header. Perhaps the file is corrupted?');
        }
    }
}
exports.Tournament = Tournament;
