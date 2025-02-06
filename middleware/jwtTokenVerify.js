const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config()
const moment = require('moment');
const current_time = Date.now() / 1000;
module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
    if (token) {
        const tokenVerify = token.split(' ')[1]
        // verifies secret and checks exp
        jwt.verify(tokenVerify, process.env.JWT_SECRET, function (err, decoded) {
            if (err) { //failed verification.
                return res.status(403).boom.forbidden("user token is not valid");
            }
            if (decoded.exp < current_time) {
                return res.status(403).boom.forbidden("user token is expired");
            }
            req.auth = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).boom.forbidden("user token is not valid");
    }
}