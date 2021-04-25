const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const PaymentSchema = new mongoose.Schema({
  "payment_id": {
    type: String,
    default: uuidv4()
  },
})

const Payment = Transaction.discriminator('Payment', PaymentSchema)

module.exports = Payment