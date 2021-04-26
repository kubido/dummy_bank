const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController')
router.post('/topup', accountController.topup);
router.post('/pay', accountController.payment);
router.post('/transfer', accountController.transfer);
router.post('/transactions', accountController.transactions);

module.exports = router;
