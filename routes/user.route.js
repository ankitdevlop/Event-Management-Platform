const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
// const jwtTokenVerify = require('../middlewares/jwtTokenVerify');
const { celebrate, Joi } = require('celebrate');



router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/refreshTokenApi", userController.refreshTokenApi);


module.exports = router;
