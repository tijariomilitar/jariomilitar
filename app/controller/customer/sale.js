const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const saleController = {};

saleController.index = async (req, res) => {
	if(!req.user) { return res.redirect('/lojista/login'); }
	res.render('customer/sale');
};

saleController.filter = async (req, res) => {
	if(!req.user) { res.send({ unauthorized: "Você não tem permissão para realizar esta ação." }); }

	const period = { key: "sale_date", start: req.body.periodStart, end: req.body.periodEnd };
	const strict_params = { keys: [], values: [] }

	lib.Query.fillParam("sale.status", req.body.status, strict_params);
	lib.Query.fillParam("sale.customer_id", req.user.id, strict_params);

	const order_params = [ ["id","DESC"] ];
	
	try {
		let sales = await Sale.filter([], [], period, [], strict_params, order_params, 0);
		res.send(sales);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = saleController;