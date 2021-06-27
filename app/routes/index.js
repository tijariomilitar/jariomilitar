const express = require('express');
const router = require("express").Router();
const app = express();

const homeController = require("../controller/home");

function redirectToHttps(req, res, next){
	// console.log('passei aqui');
	// next();
	if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
		res.redirect(`https://${req.headers.host}${req.url}`); 
	} else {
    	next();
	};
};

router.get("/", redirectToHttps, homeController.index);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/lead", require("./lead"));
router.use("/product", require("./product"));
router.use("/landing-page", require("./landing_page"));
router.use("/catalogo", require("./catalog"));

module.exports = router;