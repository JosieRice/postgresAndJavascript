const args1 = process.argv[2];
const args2 = process.argv[3];
const args3 = process.argv[4];


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

function addPerson(first, last, date) {
  console.log('Adding...');
  knex('famous_people')
    .insert([{first_name: first, last_name: last, birthdate: date}])
      .asCallback((err, results) => {
        if (err) {
          console.log('Error', err);
        }
      })
      .then(function () {
        console.log(`added ${first}`)
      return knex.destroy();
  })
}

addPerson(args1, args2, args3);
