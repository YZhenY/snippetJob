module.exports = scenarioConstructor;

var scenarioConstructor = function (name, pipeline) {
    var returnObj = {};
    returnObj['scenario'] = name;
    returnObj['pipeline'] = pipeline;
    return {};
}

