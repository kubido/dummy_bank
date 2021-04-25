const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  "user": {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  "transactions": [
    { type: Schema.Types.ObjectId, ref: 'TopUp' },
    { type: Schema.Types.ObjectId, ref: 'Payment' },
    { type: Schema.Types.ObjectId, ref: 'Transfer' },
  ],
  "balance": Number,
  "created_date": {
    type: Date,
    default: new Date()
  }
})

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account