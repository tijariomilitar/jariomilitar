const router = require("express").Router();
const lib = require("jarmlib");

const catalogController = require('../controller/catalog');

lib.route.toHttps = function(req, res, next) {
	if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
		console.log(`https://${req.hostname}${req.originalUrl}`);
        res.redirect(`https://${req.hostname}${req.originalUrl}`);
    } else {
        next();
    }
};

router.get("/", lib.route.toHttps, catalogController.index);
router.get("/varejo", lib.route.toHttps, catalogController.retail);
router.get("/atacado", lib.route.toHttps, catalogController.wholesale);
router.get("/representantes", lib.route.toHttps, catalogController.agent);
router.get("/upsell", lib.route.toHttps, catalogController.upsell);

router.post("/filter", catalogController.filter);
router.post('/product/find', catalogController.product.find);
router.post('/package/find', catalogController.package.find);

module.exports = router;