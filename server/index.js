const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/dist'));

app.listen(3000, function (err) {
    if (err) throw err;
    console.log("Connected to port 3000");
})