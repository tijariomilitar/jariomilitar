const router = require("express").Router();
const lib = require("jarmlib");

const passport = require('../../config/passport');

const customerController = require('../controller/customer/index');
const saleController = require('../controller/customer/sale');

router.get("/", lib.route.toHttps, customerController.index);

router.get("/login", lib.route.toHttps, customerController.login);
router.get("/home", lib.route.toHttps, customerController.home);

router.get("/meus-pedidos", lib.route.toHttps, saleController.index);
router.post("/sale/filter", lib.route.toHttps, saleController.filter);
router.get("/sale/findById/:id", lib.route.toHttps, saleController.findById);

router.get("/recuperar-senha", lib.route.toHttps, customerController.recover.index);
router.get("/recover/:access", lib.route.toHttps, customerController.recover.sendMail);
router.get("/alterar-senha/:token", lib.route.toHttps, customerController.recover.password);
router.post("/recover/update", lib.route.toHttps, customerController.recover.update);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/lojista/login',
	failureFlash: true
}), customerController.successfulLogin);

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/lojista/signup',
	failureFlash: true
}), customerController.successfulSignup);

router.get("/logout", lib.route.toHttps, customerController.logout);

module.exports = router;