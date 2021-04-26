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
  const session = await mongoose.startSession();
  session.startTransaction()
  try {
    // credit to target account with transactions
    // let creditTrx = await this.create([{ remarks, amount, transaction_type: "CREDIT", account: targetAccount._id }], { session })
    // let debitTrx = await this.create([{ remarks, amount, account: sourceAccount._id }], { session })

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

    // await session.commitTransaction()
    // session.endSession()

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
    console.log(debitTrx);

    return debitTrx

  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    throw error;
  }







}

const Transfer = Transaction.discriminator('Transfer', transferSchema)

module.exports = Transfer