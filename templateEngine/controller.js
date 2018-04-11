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

            var template = new Template(this.countTemplate, scenario);
            this.requestLog[template.id] = template;
            this.countTemplate ++;
            //get data from pipeline and add it to the response
            this.engineInstance.getSnippets(scenario).then(result => {
                result['template_id'] = template.id;
                resolve(result);
                console.log(`Number of Templates: ${this.countTemplate}`)
            });
        })
    }

    //called when transaction is finished, logs data 
    endPipeline(id, feedback) {
        this.requestLog[id]['completed'] = true;
        this.requestLog[id]['data'] = feedback;
        this.engineInstance.logTemplate(this.requestLog[id]);
    }

    //for the input page
    inputSnippet(scenario, segment, order, id, text) {
        this.engineInstance.inputSnippet(scenario, segment, order, id, text)
    }

    //For initial homepage
    getScenarios() {
        return this.engineInstance.getScenarios();
    }
}

class Template {
    constructor(id, scenario) {
        this.id = id;
        this.scenario = scenario;
        this.currentText = "";
        this.completed = false;
        this.data;
    }

    //Methods to be built out for HMC
    addSegment(segment) {
        this.currentText += segment;
    }

}

module.exports = new Controller();