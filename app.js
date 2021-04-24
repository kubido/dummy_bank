const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mnc_banks', { useNewUrlParser: true, useUnifiedTopology: true });

var router = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

module.exports = app;
