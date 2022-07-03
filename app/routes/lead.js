const router = require("express").Router();

const leadController = require('../controller/lead/main');

router.get("/", leadController.index);
router.post("/save", leadController.save);

module.exports = router;