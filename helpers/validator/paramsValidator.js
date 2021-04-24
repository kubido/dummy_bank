const Joi = require('joi')

const userParamsSchema = Joi.object({
  first_name: Joi.string()
    .min(3)
    .max(25),
  last_name: Joi.string()
    .min(3)
    .max(25),
  phone_number: Joi.string()
    .min(8)
    .max(14),
  pin: Joi.string()
    .min(5)
    .max(12),
  address: Joi.string()
    .min(15)
    .max(200)
}).with("phone_number", "pin")

module.exports = {
  userParamsSchema
}