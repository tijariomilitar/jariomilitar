const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/admin", require("./admin"));
router.use("/user", require("./user"));
router.use("/landing-page", require("./landing-page"));

module.exports = router;