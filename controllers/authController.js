const User = require('../models/User')
const Account = require('../models/Account')
const { registerParams, loginParams } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const register = async (req, res) => {
  try {
    const { value: userParams, error } = registerParams.validate(req.body)
    if (!error) {
      let user = new User(userParams)
      user = await user.save()
      res.status(200).json(respondWith('registerSuccess', user))
    } else {
      res.send(error)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }

}

const login = async (req, res) => {
  const { value: userParams, error } = loginParams.validate(req.body)
  try {
    if (!error) {
      const { phone_number, pin } = userParams
      const user = await User.findOne({ phone_number, pin }).exec();
      if (!user) throw respondWith('loginError')
      let response = respondWith('loginSuccess', { phone_number, pin })
      res.status(200).json(response)
    } else {
      throw respondWith('loginError')
    }
  } catch (err) {
    res.status(err.code).json({ message: err.message })
  }

}

module.exports = {
  register,
  login
}