const User = require('../models/User')
const { userParamsSchema } = require('../helpers/validator/paramsValidator')
const { respondWith } = require('../helpers/responder')

const register = async (req, res) => {
  try {
    const { value: userParams, error } = userParamsSchema.validate(req.body)
    if (!error) {
      let user = new User(userParams)
      user = await user.save()
      res.send(respondWith('user', user))
    } else {
      res.send(error)
    }
  } catch (error) {
    res.status(400).send({ message: error.message })
  }

}

const login = (req, res) => {

}

module.exports = {
  register,
  login
}