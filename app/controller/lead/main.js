const lib = require("jarmlib");

const Lead = require("../../model/lead/main");

const leadController = {};

leadController.index = async (req, res) => {
	res.render('lead/index');
};

leadController.save = async (req, res) => {
	let lead = new Lead();
	lead.datetime = new Date().getTime();
	lead.origin = req.body.origin;
	lead.name = req.body.name;
	lead.email = req.body.email;
	lead.phone = req.body.phone;

	try {
		let response = await lead.save();
		if (response.err) { return res.send({ msg: response.err }); }

		res.send({ done: "Muito obrigado, em breve um de nossos consultores entrará em contato. <br><br> Caso prefira entre em contato conosco pelo <br> Whatsapp: (21) 96421-1738." });
	} catch (err) {
		console.log(err);
		if (err.code == "ER_DUP_ENTRY") { return res.send({ done: "Muito obrigado, em breve um de nossos consultores entrará em contato <br><br> Caso prefira entre em contato conosco pelo <br> Whatsapp: (21) 96421-1738." }); }
		return res.send({ msg: "Ocorreu um erro, por favor atualize a página e tente novamente <br><br> Caso o erro persista entre em contato conosco pelo <br> Whatsapp: (21) 96421-1738." });
	};
};

module.exports = leadController;