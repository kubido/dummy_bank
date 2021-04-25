const Joi = require('joi')

const authHeaders = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    .required()
}).unknown(true)

module.exports = {
  authHeaders,
}