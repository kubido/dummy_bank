const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const TOKEN_DURATION = '24h'

const generate = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_DURATION })
const verify = (token) => jwt.verify(token, SECRET_KEY)

module.exports = {
  generate,
  verify
}