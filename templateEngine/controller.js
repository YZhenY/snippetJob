const Engine = require('./engine.js');


class Controller {
    constructor() {
        this.engineInstance = Engine;
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
            this.engineInstance.getSnippets(scenario, pipeline).then(result => {
                responseData['data'] = result;
                resolve(result);
            });
        })
    }

    //called when transaction is finished, logs data 
    endPipeline(id, feedback) {
        this.requestLog[id]['completed'] = true;
        this.requestLog[id]['data'] = feedback;
    }

    //for the input page
    inputSnippet(scenario, segment, order, id, text) {
        this.engineInstance.inputSnippet(scenario, segment, order, id, text)
    }

}

class Template {
    constructor(id) {
        this.id = id;
        this.currentText = "";
        this.completed = false;
        this.data;
    }

    addSegment(segment) {
        this.currentText += segment;
    }

}

module.exports = new Controller();