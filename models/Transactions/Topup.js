const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const Transaction = require('./index')

const TopupSchema = new mongoose.Schema({
  "top_up_id": {
    type: String,
    default: uuidv4()
  },
})

const Topup = Transaction.discriminator('Topup', TopupSchema)

module.exports = Topup