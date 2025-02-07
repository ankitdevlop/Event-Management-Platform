const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
// const jwtTokenVerify = require('../middlewares/jwtTokenVerify');
const { celebrate, Joi } = require('celebrate');
const jwtTokenVerify = require('../middleware/jwtTokenVerify');



router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/refreshTokenApi", userController.refreshTokenApi);
router.get("/getUserInfo", jwtTokenVerify,userController.getUserInfo);


module.exports = router;
