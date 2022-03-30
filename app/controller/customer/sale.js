const lib = require("jarmlib");

const Sale = require('../../model/sale/main');

const saleController = {};

saleController.index = async (req, res) => {
	if(!req.user) { return res.redirect('/lojista/login'); }
	res.render('customer/sale');
};

saleController.filter = async (req, res) => {
	if(!req.user) { return res.send({ unauthorized: "Você não tem permissão para realizar esta ação." }); }

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

saleController.findById = async (req, res) => {
	if(!req.user) { return res.send({ unauthorized: "Você não tem permissão para realizar esta ação." }); }

	const strict_params = { keys: [], values: [] }
	lib.Query.fillParam("sale.id", req.params.id, strict_params);
	lib.Query.fillParam("sale.customer_id", req.user.id, strict_params);

	try {
		let sale = (await Sale.filter([], [], [], [], strict_params, [], 0))[0];
		sale.products = await Sale.product.list(req.params.id);
		sale.packages = await Sale.package.list(req.params.id);
		for(let i in sale.packages){
			sale.packages[i].products = [];
			let package_products = await Sale.package.product.list(req.params.id, sale.packages[i].package_id);
			for(let j in package_products){
				sale.packages[i].products.push(package_products[j]);
			};
		};

		res.send(sale);
	} catch (err) {
		console.log(err);
		res.send({ msg: "Ocorreu um erro ao filtrar as vendas, favor contatar o suporte" });
	};
};

module.exports = saleController;