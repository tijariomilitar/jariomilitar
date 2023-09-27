const router = require("express").Router();

const landingPageController = require('../controller/landing_page');

router.get("/plate-carrier", landingPageController.plateCarrier);

router.get("/blackout", landingPageController.plateCarrier);
router.get("/semana-do-consumidor", landingPageController.semanaDoConsumidor);

router.get("/colete-bahia", landingPageController.coleteBahia);

router.get("/representantes", landingPageController.representantes);

module.exports = router;