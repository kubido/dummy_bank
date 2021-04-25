const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const topupSchema = new mongoose.Schema({
  "top_up_id": {
    type: String,
    default: uuidv4()
  },
  "transaction_type": {
    type: String,
    default: "CREDIT"
  },
})

const Topup = Transaction.discriminator('Topup', topupSchema)

module.exports = Topup