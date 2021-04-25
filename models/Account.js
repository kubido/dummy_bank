const mongoose = require('mongoose')

const TopUp = require('./Transactions/Topup')
const Payment = require('./Transactions/Payment')

const accountSchema = new mongoose.Schema({
  "user": {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  "transactions": [
    { type: mongoose.Schema.Types.ObjectId, ref: 'TopUp' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    { type: mongoose.Schema.Types.ObjectId, ref: 'Transfer' },
  ],
  "balance": {
    type: Number,
    default: 0
  },
  "created_date": {
    type: Date,
    default: new Date()
  }
})

accountSchema.methods.topUp = async function (amount) {
  let topup;
  let balance_before = this.balance
  let balance_after = balance_before + amount

  topup = await Payment.create({
    account: this._id,
    amount,
    balance_before,
    balance_after
  })
  await this.updateOne({
    balance: balance_after,
    $push: { transactions: topup }
  })
  return await topup.populate('account').execPopulate()
}

accountSchema.methods.payment = async function ({ amount, remarks }) {
  let payment;
  let balance_before = this.balance
  let balance_after = balance_before - amount
  if (balance_before < amount) return { error: true, message: "Balance is not enough" }

  payment = await Payment.create({
    account: this._id,
    amount,
    balance_before,
    balance_after
  })
  await this.updateOne({
    balance: balance_after,
    $push: { transactions: payment }
  })
  return await payment.populate('account').execPopulate()
}

const Account = mongoose.model('Account', accountSchema)

module.exports = Account