const router = require("express").Router();
const lib = require("jarmlib");

const catalogController = require('../controller/catalog');

router.get("/", lib.route.toHttps, catalogController.index);
router.get("/varejo", lib.route.toHttps, catalogController.retail);
router.get("/atacado", lib.route.toHttps, catalogController.wholesale);
router.get("/representantes", lib.route.toHttps, catalogController.agent);
router.get("/upsell", lib.route.toHttps, catalogController.upsell);

router.post("/filter", catalogController.filter);
router.post('/product/find', catalogController.product.find);
router.post('/package/find', catalogController.package.find);

module.exports = router;