const config = require("./dbConfig.js");
const mysql = require('mysql');
console.log(mysql)
client = mysql.createConnection(config);

client.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected!');
  }
});

client.getSnippets = function(scenario, segment) {
    //get all snippets for segment from database
}

module.exports = client;
