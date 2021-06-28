const router = require("express").Router();

function redirectToHttps(req, res, next) {
	console.log(req.headers["x-forwarded-proto"]);
	if ((req.headers["x-forwarded-proto"] || "").endsWith("http") || req.headers["x-forwarded-proto"] == undefined || req.headers["x-forwarded-proto"] == null || req.headers["x-forwarded-proto"] == ""){
		console.log(`https://${req.headers.host}${req.url}`);
		res.redirect(`https://${req.headers.host}${req.url}`); 
	} else {
    	next();
	}
};

const homeController = require("../controller/home");

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