const router = require("express").Router();

const leadController = require('../controller/lead');

// router.get('/index', leadController.index);
// router.get('/manage', leadController.manage);

// router.get('/', leadController.list);
router.post('/save', leadController.save);

module.exports = router;