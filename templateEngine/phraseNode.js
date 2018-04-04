var Phrase = function(scenario, segment, order, id, text) {
    var node = {};
    node['scenario'] = scenario;
    node['segment'] = segment;
    node['text'] = text;
    node['order'] = order;
    node['id'] = id;
    return node;
}

module.exports = Phrase;