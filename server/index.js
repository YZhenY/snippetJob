const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const templateEngineApi = require('../templateEngine/controller.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(__dirname + '/../dist'));

app.post('/input', function (req, res) {
    // console.log(req.body);

    templateEngineApi.inputSnippet(req.body.scenario, req.body.segment, req.body.order, req.body.id, req.body.text);
    res.status(200);
    res.end();
})

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Connected to port 3000");
})