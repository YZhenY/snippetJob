var client = require('./db/db.js');

var query = `select name from business where id='${id}'`;
client.query(query, (err, result) => {
    if (err) {
        console.log(err);
    } else {
    // console.log(result[0]);
        console.log(result);
    }
});