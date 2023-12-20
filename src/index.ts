// src/index.ts
import * as fs from 'fs';
import * as readlineSync from "readline-sync";
import { Tournament } from './Tournament';

const tournament = new Tournament();

// Entry point
async function main(): Promise<void> {
    // Check if at least one argument is provided
    if (process.argv.length < 3) {
        console.error('Error: Please provide a file path.');
        process.exit(1);
    }

    const filePath = process.argv[2];

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found - ${filePath}`);
        process.exit(1);
    }

    // Process the file
    tournament.processFile(filePath);

    // Wait for query
    while (true) {
        const userInput = readlineSync.question('Query: ');

        if (userInput.toLowerCase() === 'exit') {
            console.log('Exiting the program.');
            break;
        }

        console.log(tournament.query(userInput))
    }
}

// Run the CLI app
main();
