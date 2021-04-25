const mongoose = require('mongoose')

const options = { discriminatorKey: 'kind' }

const TransactionSchema = new mongoose.Schema({
  "account": {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  "user_id": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "transaction_type": String,
  "amount": Number,
  "remarks": String,
  "created_date": {
    type: Date,
    default: new Date()
  }
}, options)

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction