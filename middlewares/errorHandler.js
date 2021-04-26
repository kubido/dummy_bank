const errorHandler = (err, req, res, next) => {
  let errCode = err.code || 500
  switch (err.name) {
    case 'TopupFailed':
      res.status(400).json({ message: err.message })
      break;
    case 'PaymentFailed':
      res.status(400).json({ message: err.message })
      break;
    case 'TransferFailed':
      res.status(400).json({ message: err.message })
      break;
    default:
      res.status(errCode).json({ message: err.message })
  }

}

module.exports = errorHandler