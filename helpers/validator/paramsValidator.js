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

const topupParams = Joi.object({
  amount: Joi.number()
    .required()
    .min(10000)
})

const paymentParams = Joi.object({
  amount: Joi.number()
    .required()
    .min(10000),
  remarks: Joi.string()
    .required()
})

module.exports = {
  registerParams,
  loginParams,
  topupParams,
  paymentParams
}