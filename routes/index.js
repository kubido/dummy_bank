var express = require('express');
var router = express.Router();

const authenticate = require('../middlewares/authentication')

const authRouter = require('./authRouter')
const accountRouter = require('./accountRouter')

router.use('/', authRouter)
router.use(authenticate)
router.use('/', accountRouter)

module.exports = router