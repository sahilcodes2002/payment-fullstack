const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./accountRouter")
router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports= router;


