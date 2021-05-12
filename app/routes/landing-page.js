const router = require("express").Router();

const landingPageController = require('../controller/landing-page');

router.get("/presentation", landingPageController.presentation);

module.exports = router;