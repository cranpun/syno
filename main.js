const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname + "/wnjpn.db");

const word = process.argv[2];
const wordsql = `SELECT sense.synset AS synset FROM word JOIN sense ON sense.wordid=word.wordid WHERE lemma = '${word}'`;

db.all((wordsql), (worderr, wordrows) => {
    if (wordrows && wordrows.length > 0) {
        const wordrow = wordrows[0];
        const sql = `SELECT word.lemma AS lemma FROM sense JOIN word ON word.wordid = sense.wordid WHERE sense.synset = '${wordrow.synset}'`;
        db.all(sql, (synoerr, synorows) => {
            for(let synorow of synorows) {
                console.log(synorow.lemma);
            }
        });
    } else {
        console.warn("no word");
    }
});

db.close();