const User = require('../model/user');

const JWT = require('jsonwebtoken');

const bcrypt = require('bcrypt-nodejs');

const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.redirect('/login');
	},
	authorize: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
	},
	verifyAccess: async (req, res, access) => {
		if(req.isAuthenticated()){
			for(let i in access){
				if(access[i]==req.user.access){
					return true;
				};
			};
		};
		return false;
	}
};

module.exports = userController;