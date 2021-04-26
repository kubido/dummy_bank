const User = require('../models/User')
const Transaction = require('../models/Transactions')
const { topupParams, paymentParams, transferParams } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const topup = async (req, res) => {
  try {
    const { value: trxParams, error } = topupParams.validate(req.body)
    if (!error) {
      const topup = await req.account.topUp(trxParams.amount)
      const data = respondWith('topupSuccess', topup)
      res.json(data)
    } else {
      next({ name: "TopupFailed", message: error.details.map(e => e.message).join(",") })
    }
  } catch (error) {
    next({ name: "TopupFailed", message: error.message })

  }
}

const payment = async (req, res, next) => {
  try {
    const { value: trxParams, error } = paymentParams.validate(req.body)
    if (!error) {
      const payment = await req.account.payment(trxParams)
      if (payment.error) return next({ message: payment.message })
      const data = respondWith('paymentSuccess', payment)
      res.json(data)
    } else {
      next({ name: "PaymentFailed", message: error.details.map(e => e.message).join(",") })
    }
  } catch (error) {
    next({ name: "PaymentFailed", message: error.message })
  }
}

const transfer = async (req, res, next) => {
  try {
    const { value: trxParams, error } = transferParams.validate(req.body)
    if (!error) {
      const targetUser = await User.findOne({ user_id: trxParams.target_user }).exec()

      // transaction without queue
      // const transfer = await req.account.doDirectTransfer({ ...trxParams, targetUser })
      // if (transfer.error) return next({ message: transfer.message })
      // const data = respondWith('transferSuccess', transfer)
      // res.json(data)

      // transaction with queue
      const transferStatus = await req.account.doTransfer({ ...trxParams, targetUser })
      if (!transferStatus) return next({ name: "TransferFailed", message: "Something went wrong" })
      const data = respondWith('transferSuccess', payment)
      res.status(200).json(data)
    } else {
      res.send({ message: error.details.map(e => e.message).join(",") })
    }
  } catch (error) {
    next({ name: "TransferFailed", message: error.message })
  }
}

const transactions = async (req, res, next) => {
  try {
    let transactions = await Transaction.find({ account: req.account._id })
      .populate({
        path: 'account',
        populate: {
          path: 'user',
          model: 'User'
        }
      })
    const data = respondWith('transactionsSuccess', transactions)
    res.json(data)
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = {
  topup,
  payment,
  transfer,
  transactions
}