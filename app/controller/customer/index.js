const Customer = require("../../model/customer");
const Sale = require("../../model/sale/main");
const Rank = require("../../model/rank");

const lib = require("jarmlib");

const customerController = {};

customerController.index = async (req, res) => {
	res.redirect('/portal-do-lojista');
};

customerController.home = async (req, res) => {
	if(!req.user) { return res.redirect('/lojista/login'); }

	let customer = (await Customer.findBy.id(req.user.id))[0];

	const period = {
		key: "sale_date",
		start: (new Date().getTime()) - (lib.date.timestamp.day() * 90),
		end: new Date().getTime()
	};

	const strict_params = { keys: [], values: [] }
	lib.Query.fillParam("sale.customer_id", req.user.id, strict_params);
	const order_params = [ ["id","DESC"] ];
	let sales = await Sale.filter([], [], period, [], strict_params, order_params, 0);

	const saleStatistics = {
		saleValue: 0,
		shipmentValue: 0,
		discountValue: 0,
		totalValue: 0
	};

	for(let i in sales) {
		if(sales[i].status == "Ag. embalo" || sales[i].status == "Ag. nota fiscal" || sales[i].status == "Ag. envio" || sales[i].status == "Enviado"){
			saleStatistics.saleValue += parseFloat(sales[i].product_value);
			saleStatistics.saleValue += parseFloat(sales[i].package_value);
			saleStatistics.shipmentValue += parseFloat(sales[i].shipment_value);
			saleStatistics.discountValue += parseFloat(sales[i].discount_value);
			saleStatistics.totalValue += parseFloat(sales[i].value);
		} else {
			sales.splice(i, 1);
			i--;
		};
	};

	console.log(saleStatistics);

	for(let i in Rank) {
		if(saleStatistics.totalValue > Rank[i].min_value && saleStatistics.totalValue < Rank[i].max_value) {
			customer.rank = Rank[i];
			console.log(customer.rank);
		};
	};

	console.log(customer);

	res.render('customer/home', { customer, sales, saleStatistics });
};

customerController.login = async (req, res) => {
	if(req.user) { return res.redirect("/lojista/home"); }
	
	res.render('customer/login', { user: req.user, message: req.flash('loginMessage') });
};

customerController.successfulLogin = (req, res) => {
	res.redirect('/lojista/home');
};

customerController.signup = async (req, res) => {
	if(req.user){
		return res.redirect('/');
	};
	res.render('user/signup', { user: req.user, message: req.flash('signupMessage')});
};

customerController.successfulSignup = (req, res) => {
	res.redirect('/');
};

customerController.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};

module.exports = customerController;