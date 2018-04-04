var db = require('./db/db.js');

class EngineInstance {
    constructor(scenarios, database) {
        this.scenarios = scenarios;
        this.database = database;
        this.countTemplate = 0;
        this.requestLog = {};
    }

    //draw parts from db and send over the choices
    startPipeline(scenario) {
        return new Promise ((resolve, reject) => {
            var pipeline = this.scenarios[scenario].pipeline;
            var template = new Template(this.countTemplate);
            this.requestLog[template.id] = template;
            this.countTemplate ++;
            var responseData = {
                scenario: scenario,
                pipeline: pipeline,
            };
            //get data from pipeline and add it to the response
            this.getSnippets(scenario, pipeline).then(result => {
                responseData['data'] = result;
                resolve(result);
            })
        })
    }

    //called when transaction is finished, logs data 
    endPipeline(id, feedback) {
        this.requestLog[id]['completed'] = true;
    }



    //gather database calls
    getSnippets(scenario, pipeline) {
        return new Promise ((resolve, reject) => {
            var count = 0;
            var data = {};
            for (var i = 0; i < pipeline.length; i ++) {
                db.getSnippets(scenario, pipeline[i])
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

class Template {
    constructor(id) {
        this.id = id;
        this.currentText = "";
        this.completed = false;
    }

    addSegment(segment) {
        this.currentText += segment;
    }


}