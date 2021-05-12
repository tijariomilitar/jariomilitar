const User = require('../model/user');
const userController = require('./user');

const landingPageController = {
	presentation: async (req, res) => { return res.render('landing-page/presentation', { user: req.user }); }
};

module.exports = landingPageController;