
class EngineInstance {
    constructor(scenarios, database) {
        this.scenarios = scenarios;
        this.database = database;
    }

    //draw parts from db and send over the choices
    startPipeline() {
        var pipeline = this.scenarios.pipeline;
        var resultString = "";
        for (var i = 0; i < pipeline.length; i ++) {
            
        }
    }

    //called upon submission of parts/order of parts
}

class Template {
    constructor() {
        this.currentText = "";
    }

    addSegment(segment) {
        this.currentText += segment;
    }


}