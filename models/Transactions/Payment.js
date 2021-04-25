const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const paymentSchema = new mongoose.Schema({
  "payment_id": {
    type: String,
    default: uuidv4()
  },
  "transaction_type": {
    type: String,
    default: "DEBIT"
  }
})


const Payment = Transaction.discriminator('Payment', paymentSchema)

module.exports = Payment