const router = require("express").Router();

const landingPageController = require('../controller/landing_page');

router.get("/plate-carrier", landingPageController.plateCarrier);

module.exports = router;