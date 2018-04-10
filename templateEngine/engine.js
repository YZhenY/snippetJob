const db = require('../db/mongo.js');
var scenarios = require('./scenarios/coverLetter.js');
//arguments for phrase constructor: (scenario, segment, order, id, text)
const Phrase = require('./phraseNode.js');

class Engine {
    constructor() {
        this.database = db;
        // console.log("this is db", db)
        this.scenarios = {};
        for (var i = 0; i < scenarios.length; i ++) {
            this.scenarios[scenarios[i]['scenario']] = scenarios[i];
        }
    }

    inputSnippet(scenario, segment, order, id, text) {
        var newPhrase = new Phrase(scenario, segment, order, id, text);
        db.inputSnippet(newPhrase);
    }

    //gather database calls
    getSnippets(scenario) {
        var pipeline = this.scenarios[scenario].pipeline;
        return new Promise ((resolve, reject) => {
            var count = 0;
            var data = {pipeline: pipeline};
            var promises = [];
            for (var i = 0; i < pipeline.length; i ++) {
                var segment = pipeline[i];
                promises.push(this.database.getSnippets(scenario, segment));
            }
            Promise.all(promises).then(result => {
                data['data'] = result;
                resolve(data);
            })
        })
    }

    getScenarios() {
        return Object.keys(this.scenarios);
    }

}

module.exports = new Engine();