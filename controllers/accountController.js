const { topupParams, paymentParams } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const topup = async (req, res) => {
  try {
    const { value: trxParams, error } = topupParams.validate(req.body)
    if (!error) {
      const topup = await req.account.topUp(trxParams.amount)
      res.json(respondWith('topupSuccess', topup))
    } else {
      res.send({ message: error })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

const payment = async (req, res, next) => {
  try {
    const { value: trxParams, error } = paymentParams.validate(req.body)
    if (!error) {
      const payment = await req.account.payment(trxParams)
      if (payment.error) return next({ message: payment.message })
      res.json(respondWith('paymentSuccess', payment))
    } else {
      res.send({ message: error })
    }
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = {
  topup,
  payment
}