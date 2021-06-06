const User = require('../model/user');
const userController = require('./user');

const landingPageController = {
	plateCarrier: async (req, res) => { return res.render('landing_page/plate_carrier', { user: req.user }); }
};

module.exports = landingPageController;