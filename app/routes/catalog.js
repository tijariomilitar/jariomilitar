const router = require("express").Router();

const catalogController = require('../controller/catalog');

router.get("/", catalogController.index);

module.exports = router;