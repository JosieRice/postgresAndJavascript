const args = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
      user: "development",
  password: "development",
  database: "test_db",
  hostname: "localhost",
  port: 5432,
  ssl: true
  },
});

function findByName(args) {
  console.log('Searching...');
  knex('famous_people')
    .select()
    .from('famous_people')
    .where('first_name', args)
    .orWhere('last_name', args)
    .asCallback((err, results) => {
      if (err) {
        console.log('Error', err);
      } else {
        logResults(args, results);
      }
    })
  // pooling business and closing the connection
  .then(function () {
      return knex.destroy();
  })
  .then(function () {
      console.log('output completed');
  });
}


const logResults = function(args, results) {
  console.log(`Found ${results.length} person(s) with the name '${args}':`);
  for (var i = 0; i < results.length; i++) {
      console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born '${results[i].birthdate.toISOString().slice(0, 10)}'`);
    }
};

findByName(args);
