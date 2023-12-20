import {Tournament} from "../src/Tournament";

const tournament = new Tournament();
tournament.processFile('./full_tournament.txt');

test('processFile method creates tournament with 2 matches between 3 players', () => {
    expect(tournament.matches).toHaveProperty('01');
    expect(tournament.matches).toHaveProperty('02');
    expect(tournament.players).toHaveProperty('Person A');
    expect(tournament.players).toHaveProperty('Person B');
    expect(tournament.players).toHaveProperty('Person C');
});

test('queries match sample results from readme', () => {
    expect(tournament.query('Score Match 01')).toMatch('Person A defeated Person B \n2 sets to 0');
    expect(tournament.query('Score Match 02')).toMatch('Person C defeated Person A \n2 sets to 1');
    expect(tournament.query('Games Player Person A')).toMatch('23 17');
});