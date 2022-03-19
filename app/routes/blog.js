const router = require("express").Router();
const lib = require("jarmlib");

const blogController = require('../controller/blog/index');
const articleController = require('../controller/blog/article');

router.get("/", lib.route.toHttps, blogController.index);
router.get("/artigo/:id", lib.route.toHttps, blogController.article);

router.get("/novo-artigo", lib.route.toHttps, articleController.index);
router.get("/gerir-artigos", lib.route.toHttps, articleController.manage);
router.post("/article/create", lib.route.toHttps, articleController.create);
router.post("/article/filter", lib.route.toHttps, articleController.filter);
router.get("/article/find/:id", lib.route.toHttps, articleController.findById);

router.post("/article/content/create", lib.route.toHttps, articleController.content.create);
router.post("/article/content/list", lib.route.toHttps, articleController.content.list);
router.get("/article/content/find/:id", lib.route.toHttps, articleController.content.findById);

module.exports = router;