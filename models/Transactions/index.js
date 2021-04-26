const mongoose = require('mongoose')

const options = { discriminatorKey: 'kind' }

const transactionSchema = new mongoose.Schema({
  "account": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  "status": {
    type: String,
    default: "PENDING",
  },
  "transaction_type": String,
  "amount": {
    type: Number,
    required: true
  },
  "remarks": String,
  "balance_before": {
    type: Number,
    required: true
  },
  "balance_after": {
    type: Number,
    required: true
  },
  "created_date": {
    type: Date,
    default: new Date()
  }
}, options)


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction