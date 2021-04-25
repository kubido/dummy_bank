const User = require('../models/User')
const { registerParams, loginParams } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const topup = async (req, res) => {
  try {
    res.json("Topup")
  } catch (error) {
    res.json("Error Topup")
  }

}

module.exports = {
  topup,
}