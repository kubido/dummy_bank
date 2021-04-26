const Queue = require('bull');
const transferBalanceQueue = new Queue('Transfer Balance', 'redis://127.0.0.1:6379');

const Transfer = require('../models/Transactions/Transfer')
const Account = require('../models/Account')

transferBalanceQueue.process(async function (job, done) {
  try {
    const {
      sourceAccount,
      targetAccount,
      remarks,
      amount
    } = job.data

    // debit from source account
    let debitTrx = await Transfer.create({
      remarks,
      amount,
      balance_before: sourceAccount.balance,
      balance_after: sourceAccount.balance - amount,
      account: sourceAccount._id
    })

    // credit to target account
    let creditTrx = await Transfer.create({
      remarks,
      amount,
      transaction_type: "CREDIT",
      balance_before: targetAccount.balance,
      balance_after: targetAccount.balance + amount,
      account: targetAccount._id
    })

    // await session.commitTransaction()
    // session.endSession()

    // update source account balance
    await Account.updateOne({
      _id: sourceAccount._id
    }, {
      $inc: { balance: -amount },
      $push: { transactions: debitTrx }
    })

    // update target account balance
    await Account.updateOne({
      _id: targetAccount._id
    }, {
      $inc: { balance: amount },
      $push: { transactions: creditTrx }
    })
    done()
    return true
  } catch (error) {
    return false
  }
})

module.exports.transferJob = transferBalanceQueue

