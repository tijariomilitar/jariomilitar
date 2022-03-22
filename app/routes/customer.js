const router = require("express").Router();
const lib = require("jarmlib");

const customerController = require('../controller/customer/index');

router.get("/", lib.route.toHttps, customerController.index);
router.get("/lojista", lib.route.toHttps, customerController.index);

module.exports = router;