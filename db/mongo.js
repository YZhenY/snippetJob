const MongoClient = require('mongodb').MongoClient;


class API {
    constructor() {
        this.db;
        this.client;
        this.collection;
        // Connection url
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, (err, client) => {
            // Use the admin database for the operation
            if (err) throw err;
            console.log("Connected successfully to MONGO, DB READY");
            this.db = client.db('snippet');
            this.collection = this.db.collection('snippets');
        });  
    }

    getSnippets(scenario, segment) {
        return new Promise ((resolve, reject) => {
            console.log(`Getting ${scenario} and ${segment} from database`);
            this.collection.find({scenario:scenario, segment:segment})
            .toArray((err, docs) => {
                if (err) reject(err)
                resolve(docs);
            })
        })


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

//intializing
var newApi = new API();
module.exports = newApi;
