const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || "asdasd"
const TOKEN_DURATION = '24h'

const generate = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_DURATION })
const verify = (token) => jwt.verify(token, SECRET_KEY)
const refresh = (token) => {
  const payload = jwt.verify(token, SECRET_KEY);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
  return generate(payload)
}

module.exports = {
  generate,
  verify,
  refresh
}