const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
// app.use(express.favicon(__dirname + '/public/images/favicon/favicon-black.ico'));
app.set('views', path.join(__dirname, 'app/view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./app/routes/index'));

module.exports = app;