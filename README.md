# tennis-the-menace

A node app with minimal dependencies. Developed for node v18.12.0, but should run on other versions too.

Fun app to build. Spent about 5 hours all up.

### How to run
````
npm install
````

````
npm run tennis-the-menace ./full_tournament.txt
````

Provide a query to return statistical data, eg:
````
Query: Games Player Person A
23 17

Query: Score Match 02
Person C defeated Person A 
2 sets to 1

Query: Games Player Person B
0 12

Query: Score Match 01
Person A defeated Person B 
2 sets to 0

Query: Points Player Person A
92 68
````

### Assumptions made

- I've assumed that the input file will provide well-formed match data that will contain precisely the right number of sequential points to determine a winner.
- The only edge-case I handle for the input are blank lines, as they are specifically mentioned in the README.md.
- I've assumed that the sample output formatting in the README.md is a suggestion and not a hard requirement. I had some issues piping a heredoc to my containerised node env and didn't want to spend too much time troubleshooting outside the core scope.
- Because the example output included a `Games Player {Name}` query, I assumed you would also like to query players Points, Set and Match aggregates too.