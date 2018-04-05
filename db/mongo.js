const MongoClient = require('mongodb').MongoClient;


class API {
    constructor() {
        this.db;
        this.client;
    }
    
    initialize() {
        // Connection url
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, (err, client) => {
            // Use the admin database for the operation
            if (err) throw err;
            console.log("Connected successfully to MONGO, DB READY");
            this.db = client.db('snippet');
        
        });  
    }

    inputSnippet(newPhrase) {
        var collection = this.db.collection('snippets');
        collection.insertOne(newPhrase, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Saved newPhrase for ${newPhrase.scenario}`)
            }
        })
    }
}
module.exports = new API();
