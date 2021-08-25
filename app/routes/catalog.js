const router = require("express").Router();
const lib = require("jarmlib");

const catalogController = require('../controller/catalog');

router.get("/", catalogController.index);

router.post("/filter", catalogController.filter);
router.post('/product/find', catalogController.product.find);
router.post('/package/find', catalogController.package.find);

module.exports = router;