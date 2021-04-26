const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const { setQueues, BullAdapter, router: bullRouter } = require('bull-board')
const jobQueue = require('./jobs/TransferJob')

let NODE_ENV = process.env.NODE_ENV || "development"

// hardcode for interview purpose
mongoose.connect(`mongodb://localhost:27017/mnc_banks_${NODE_ENV}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

setQueues([
  new BullAdapter(jobQueue.transferJob),
]);

const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/queues', bullRouter)
app.use(router);

app.use(errorHandler)

module.exports = app;
