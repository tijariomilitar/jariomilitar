const router = require("express").Router();
const lib = require("jarmlib");

const catalogController = require('../controller/catalog');

router.get("/", catalogController.index);
router.get("/varejo", catalogController.retail);
router.get("/atacado", catalogController.wholesale);
router.get("/representantes", catalogController.agent);
router.get("/upsell", catalogController.upsell);

router.post("/filter", catalogController.filter);
router.post('/product/find', catalogController.product.find);
router.post('/package/find', catalogController.package.find);

module.exports = router;