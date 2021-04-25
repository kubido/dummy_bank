const Joi = require('joi')

const registerParams = Joi.object({
  first_name: Joi.string()
    .min(3)
    .max(25),
  last_name: Joi.string()
    .min(3)
    .max(25),
  phone_number: Joi.string()
    .required()
    .min(8)
    .max(14),
  pin: Joi.string()
    .required()
    .min(5)
    .max(12),
  address: Joi.string()
    .min(15)
    .max(200)
})

const loginParams = Joi.object({
  phone_number: Joi.string()
    .required()
    .min(8)
    .max(14),
  pin: Joi.string()
    .required()
    .min(5)
    .max(12),
})

module.exports = {
  registerParams,
  loginParams
}