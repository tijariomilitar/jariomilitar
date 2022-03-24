const router = require("express").Router();
const lib = require("jarmlib");

const passport = require('../../config/passport');

const customerController = require('../controller/customer/index');

router.get("/", lib.route.toHttps, customerController.index);

router.get("/login", lib.route.toHttps, customerController.login);
router.get("/home", lib.route.toHttps, customerController.home);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/login',
	failureFlash: true
}), customerController.successfulLogin);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/signup',
	failureFlash: true
}), customerController.successfulSignup);

router.get("/logout", lib.route.toHttps, customerController.logout);

module.exports = router;