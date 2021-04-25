const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const transferSchema = new mongoose.Schema({
  "transfer_id": {
    type: String,
    default: uuidv4()
  },
  "transaction_type": {
    type: String,
    default: "DEBIT"
  }
})

const Transfer = Transaction.discriminator('Transfer', transferSchema)

module.exports = Transfer