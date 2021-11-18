const router = require("express").Router();
const lib = require('jarmlib');

const homeController = require("../controller/home");
const landingPageController = require('../controller/landing_page');

router.get("/", lib.route.toHttps, homeController.index);
router.get("/info", lib.route.toHttps, homeController.info);
router.get("/colete-numero-1", landingPageController.number_1);
router.get("/meu-produto", landingPageController.myProduct);

router.get("/blackout", lib.route.toHttps, landingPageController.blackout);
router.get("/lancamento-da-semana", lib.route.toHttps, landingPageController.lancamento_da_semana);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/lead", require("./lead"));
router.use("/product", require("./product"));
router.use("/landing-page", require("./landing_page"));
router.use("/catalogo", require("./catalog"));

module.exports = router;