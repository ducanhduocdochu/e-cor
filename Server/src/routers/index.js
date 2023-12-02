const express = require('express');
// const { apiKey, permission } = require("../auth/checkAuth");
// const productRouter = require('./product');
const accessRouter = require('./access');
const userRouter = require('./user');

const router = express.Router();

// check apiKey
// router.use(apiKey);
// check permission
// router.use(permission('0000'));
// route

// router.use('/v1/api/product', productRouter);
router.use('/v1/api', accessRouter);
router.use('/v1/api', userRouter);

module.exports = router;
