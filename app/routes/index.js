const router = require("express").Router();
const lib = require('../../config/lib');

const homeController = require("../controller/home");

console.log(lib.redirectToHttps);

router.get("/", lib.redirectToHttps, homeController.index);

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