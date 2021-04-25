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
    default:
      break;
  }
  return response
}

module.exports = {
  respondWith
}