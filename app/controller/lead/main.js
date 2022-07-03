const lib = require("jarmlib");

const Lead = require("../../model/lead/main");

const leadController = {};

leadController.index = async (req, res) => {
	res.render('lead/index');
};

leadController.save = async (req, res) => {
	let lead = new Lead();
	lead.datetime = new Date().getTime();
	lead.name = req.body.name;
	lead.email = req.body.email;
	lead.phone = req.body.phone;

	if(!lead.datetime) { return res.send({ msg: "Ocorreu um erro ao realizar seu cadastro por favor atualize a página." }); }
	if(!lead.name) { return res.send({ msg: "Por favor preencha seu nome para que possamos te conhecer." }); }
	if(!lead.email) { return res.send({ msg: "É necessário preencher seu email para que possamos lhe enviar nosso catálogo" }); }
	if(!lead.phone) { return res.send({ msg: "Por favor preencha seu telefone para que possamos entrar em contato." }); }

	try	{
		await lead.save();
		res.send({ done: "Muito obrigado, em breve um de nossos consultores entrará em contato." });
	} catch (err) {
		console.log(err);
		return res.send({ msg: "Ocorreu um erro ao realizar o seu cadastro." });
	};
};

module.exports = leadController;