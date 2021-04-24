function respondWith(resource, payload) {
  let response = null
  switch (resource) {
    case 'user':
      let { user_id, first_name, last_name, phone_number, address, created_date } = payload
      response = {
        user_id,
        first_name,
        last_name,
        phone_number,
        address,
        created_date
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