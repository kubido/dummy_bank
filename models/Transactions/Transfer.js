const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const TransferSchema = new mongoose.Schema({
  "transfer_id": {
    type: String,
    default: uuidv4()
  },
})

const Transfer = Transaction.discriminator('Transfer', TransferSchema)

module.exports = Transfer