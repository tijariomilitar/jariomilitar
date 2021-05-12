const User = require('../model/user');
const userController = require('./user');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/index', { user: req.user });
	},
	user: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('admin/user', { user: req.user });
	},
	product: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm'])){
			return res.redirect('/');
		};
		res.render('product/index', { user: req.user });
	}
};

module.exports = adminController;