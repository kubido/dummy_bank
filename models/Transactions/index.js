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
  "user_id": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  "transaction_type": String,
  "amount": {
    type: Number,
    required: true
  },
  "remarks": String,
  "created_date": {
    type: Date,
    default: new Date()
  }
}, options)

transactionSchema.virtual('balance_before')
transactionSchema.virtual('balance_after')

transactionSchema.set('toJSON', {
  virtuals: true
});

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction