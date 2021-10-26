const router = require("express").Router();

const productController = require('../controller/product');

router.get('/index', productController.index);
router.get('/colorList', productController.colorList);

module.exports = router;