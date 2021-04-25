const errorHandler = (err, req, res, next) => {
  let errCode = err.code || 500
  switch (err.name) {
    case 'databaseValidation':

      break;
    case 'paramValidation':
      break;
    default:
      res.status(errCode).json({ message: err.message })
  }

}

module.exports = errorHandler