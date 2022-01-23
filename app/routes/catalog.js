const router = require("express").Router();
const lib = require("jarmlib");

const catalogController = require('../controller/catalog');

router.get("/", lib.route.toHttps, catalogController.index);
router.get("/:path", lib.route.toHttps, catalogController.find);

router.post("/filter", catalogController.filter);
router.get("/produto/:product_id/:catalog_id", lib.route.toHttps, catalogController.product.find);
router.get("/pacote/:package_id/:catalog_id", lib.route.toHttps, catalogController.package.find);

module.exports = router;