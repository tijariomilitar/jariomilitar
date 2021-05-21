const router = require("express").Router();

const productController = require('../controller/product');

router.get('/index', productController.index);
router.get('/manage', productController.manage);

router.get('/', productController.list);
router.post('/save', productController.save);
router.get('/id/:id', productController.findById);
router.get('/code/:code', productController.findByCode);
router.get('/name/:name', productController.findByName);
router.get('/filter', productController.filter);
router.delete('/delete', productController.delete);

router.get('/catalog/filter', productController.catalog.filter);
router.get('/show/:id', productController.show);
router.get('/package/show/:id', productController.package.show);

router.get('/datasheet/:product_code', productController.datasheet);

router.post('/image/add', productController.image.add);
router.delete('/image/remove', productController.image.remove);

router.post('/categorySave', productController.categorySave);
router.get('/categoryList', productController.categoryList);

router.post('/colorSave', productController.colorSave);
router.get('/colorList', productController.colorList);

module.exports = router;