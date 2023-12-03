const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
// const productRouter = require('./product');
const accessRouter = require("./access");
const userRouter = require("./user");
const adminRouter = require("./admin");
const categoryRouter = require("./category");

const router = express.Router();

// router.use('/v1/api/product', productRouter);
router.use("/v1/api/category", categoryRouter);
router.use("/v1/api/user", userRouter);
router.use("/v1/api/access", accessRouter);

router.use("/v1/api/admin" ,adminRouter);
module.exports = router;
