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

transferSchema.statics.doTransfer = async function ({ sourceAccount, targetAccount, remarks, amount }) {


  // debit from source account
  let debitTrx = await this.create({
    remarks,
    amount,
    account: sourceAccount._id
  })

  // credit to target account
  let creditTrx = await this.create({
    remarks,
    amount,
    transaction_type: "CREDIT",
    account: targetAccount._id
  })

  // update source account balance
  await sourceAccount.updateOne({
    $inc: { balance: -amount },
    $push: { transactions: debitTrx }
  })

  // update target account balance
  await targetAccount.updateOne({
    $inc: { balance: amount },
    $push: { transactions: creditTrx }
  })

  return debitTrx

}

const Transfer = Transaction.discriminator('Transfer', transferSchema)

module.exports = Transfer