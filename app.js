const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mnc_banks', { useNewUrlParser: true, useUnifiedTopology: true });

const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler)

module.exports = app;
