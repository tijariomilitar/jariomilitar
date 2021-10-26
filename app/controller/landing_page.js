const User = require('../model/user');
const userController = require('./user');

const landingPageController = {
	plateCarrier: async (req, res) => { return res.render('landing_page/plate_carrier', { user: req.user }); },
	blackout: async (req, res) => { return res.render('landing_page/blackout', { user: req.user }); },
	lancamento_da_semana: async (req, res) => { return res.render('landing_page/lancamento-da-semana', { user: req.user }); }
};

module.exports = landingPageController;