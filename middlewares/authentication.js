
const User = require('../models/User')

const jwt = require('../helpers/jwt')
const { authHeaders } = require('../helpers/validator/headersValidator')

const authenticate = async (req, res, next) => {
  try {
    const { value: headers, error } = authHeaders.validate(req.headers)
    if (!error) {
      let token = headers.authorization.split(" ")[1]
      let { phone_number, pin } = jwt.verify(token)
      let user = await User.findOne({ phone_number, pin })
      if (!user) throw new Error('Unauthorized')
      req.currentUser = user
      next()
    } else {
      next(error)
    }
  } catch (err) {
    res.send({ message: err.message })
  }
}

module.exports = authenticate