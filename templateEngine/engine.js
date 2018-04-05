const db = require('../db/mongo.js');
db.initialize();
var scenarios = require('./scenarios/coverLetter.js');
//arguments for phrase constructor: (scenario, segment, order, id, text)
const Phrase = require('./phraseNode.js');

class Engine {
    constructor() {
        this.database = db;
        // console.log("this is db", db)
        this.scenarios = scenarios;

    }

    inputSnippet(scenario, segment, order, id, text) {
        var newPhrase = new Phrase(scenario, segment, order, id, text);
        db.inputSnippet(newPhrase);
    }

    //gather database calls
    getSnippets(scenario, pipeline) {
        return new Promise ((resolve, reject) => {
            var count = 0;
            var data = {};
            for (var i = 0; i < pipeline.length; i ++) {
                this.database.getSnippets(scenario, pipeline[i])
                .then(result => {
                    count++;
                    data[pipeline[i]] = result;
                    if (count === pipeline.length) {
                        resolve(data);
                    }
                }).catch(err => console.log(err));
            }
        })
    }

}

module.exports = new Engine();