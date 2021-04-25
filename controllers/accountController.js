const Topup = require('../models/Transactions/Topup')
const Account = require('../models/Account')

const { topupParams } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const topup = async (req, res) => {
  try {
    const { value: trxParams, error } = topupParams.validate(req.body)
    if (!error) {
      const account = await Account.findOne({ user: req.currentUser._id })
      const topup = await account.topUp(trxParams.amount)
      res.json(respondWith('topupSuccess', topup))
    } else {
      res.send({ message: error })
    }
  } catch (error) {
    res.json({ message: error.message })
  }

}

module.exports = {
  topup,
}