const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const jwt = require('../helpers/jwt')
const Account = require('../models/Account')
const User = require('../models/User')

mongoose.connect(`mongodb://localhost:27017/mnc_banks_${process.env.NODE_ENV}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let jwtToken;
let account;
let user

beforeAll(async () => {
  await User.remove({})
  const userParams = {
    first_name: "Guntur",
    last_name: "Saputro",
    phone_number: "0811255501",
    address: "Jl. Kebon Sirih No. 1",
    pin: "123456"
  }

  user = await User.create(userParams)
  const payload = { phone_number: user.phone_number, pin: user.pin }
  jwtToken = jwt.generate(payload)
  account = await Account.findOne({ user: user._id })
})

describe("topup account", () => {
  it('should return success when valid params is supplied', async (done) => {
    const topupParams = {
      amount: 500000
    }
    const balance_before = account.balance
    const balance_after = balance_before + topupParams.amount

    request(app)
      .post('/topup')
      .send(topupParams)
      .set('Authorization', `Bearer ${jwtToken}`)
      .end(async (err, res) => {
        if (err) done(err)

        expect(res.body).toHaveProperty("status", "success")
        expect(res.body.result).toHaveProperty("amount_top_up", topupParams.amount)
        expect(res.body.result).toHaveProperty("balance_before", balance_before)
        expect(res.body.result).toHaveProperty("balance_after", balance_after)
        done()
      })
  })
})

describe("account payment", () => {
  it('should return success when payment amount is less than account balance', async (done) => {
    const paymentParams = {
      amount: 150000,
      remarks: "Pembayaran tokopedia"
    }
    account = await Account.findOne({ user: user._id })
    const balance_before = account.balance
    const balance_after = balance_before - paymentParams.amount

    request(app)
      .post('/pay')
      .send(paymentParams)
      .set('Authorization', `Bearer ${jwtToken}`)
      .end(async (err, res) => {
        if (err) done(err)
        expect(res.body).toHaveProperty("status", "success")
        expect(res.body.result).toHaveProperty("amount", paymentParams.amount)
        expect(res.body.result).toHaveProperty("remarks", paymentParams.remarks)
        expect(res.body.result).toHaveProperty("balance_before", balance_before)
        expect(res.body.result).toHaveProperty("balance_after", balance_after)
        done()
      })
  })

  it('should return error balance is not enough for doing payment', async (done) => {
    const paymentParams = {
      amount: 1150000,
      remarks: "Pembayaran tokopedia"
    }
    account = await Account.findOne({ user: user._id })
    const balance_before = account.balance
    const balance_after = balance_before - paymentParams.amount

    request(app)
      .post('/pay')
      .send(paymentParams)
      .set('Authorization', `Bearer ${jwtToken}`)
      .end(async (err, res) => {
        if (err) done(err)
        expect(res.body).toHaveProperty("message", "Balance is not enough")
        done()
      })
  })
})