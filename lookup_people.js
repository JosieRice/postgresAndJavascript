const args = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
});

function findByName(firstName) {
  console.log('Searching...');
  client.query(`SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`, [firstName], (err, result) => {
    if (err) {
      return console.error("error with query ", err);
    }
    logResults(args, result);
        client.end();
  });
}

const logResults = function(args, result) {
  console.log(`Found ${result.rows.length} person(s) with the name '${args}':`);
  for (var i = 0; i < result.rows.length; i++) {
      console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate.toISOString().slice(0, 10)}'`);
    }
}

findByName(args);