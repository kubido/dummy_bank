const { ProxyAuthenticationRequired } = require('http-errors');
const jwt = require('../../helpers/jwt')

function respondWith(resource, payload) {
  let response = null
  switch (resource) {
    case 'registerSuccess':
      let { user_id, first_name, last_name, phone_number, address, created_date } = payload
      response = {
        user_id,
        first_name,
        last_name,
        phone_number,
        address,
        created_date
      }
      break;
    case 'loginSuccess':
      const access_token = jwt.generate(payload)
      response = {
        status: "success",
        result: {
          access_token: access_token,
          refresh_token: jwt.refresh(access_token),
        }
      }
      break;
    case 'loginError':
      response = { code: 401, message: "Phone number and pin doesn’t match." }
      break
    case 'topupSuccess':
      response = {
        status: "success",
        result: {
          top_up_id: payload.top_up_id,
          amount_top_up: payload.amount,
          balance_before: payload.balance_before,
          balance_after: payload.balance_after,
          created_date: payload.created_date
        }
      }
      break
    case 'paymentSuccess':
      response = {
        status: "success",
        result: {
          payment_id: payload.payment_id,
          amount: payload.amount,
          remarks: payload.remarks,
          balance_before: payload.balance_before,
          balance_after: payload.balance_after,
          created_date: payload.created_date
        }
      }
      break
    case 'transferSuccess':
      response = {
        status: "success",
        result: {
          transfer_id: payload.transfer_id,
          amount: payload.amount,
          remarks: payload.remarks,
          balance_before: payload.balance_before,
          balance_after: payload.balance_after,
          created_date: payload.created_date
        }
      }
      break
    default:
      break;
  }
  return response
}

module.exports = {
  respondWith
}