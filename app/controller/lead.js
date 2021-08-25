const User = require('../model/user');
const userController = require('./user');
const lib = require('jarmlib');

const Lead = require('../model/lead');

const leadController = {
	save: async (req, res) => {
		// if(!await userController.verifyAccess(req, res, ['adm', 'man'])){
		// 	return res.redirect("/");
		// };

		let lead = new Lead();
		lead.name = req.body.name;
		lead.email = req.body.email;

		try {
			await lead.save();
			res.send({ done: 'Enviamos o cupom de desconto para seu e-mail.' });
		} catch (err) {
			console.log(err);
			res.send({ msg: "Ocorreu um adquirir seu cupom." });
		};
	}
};

module.exports = leadController;