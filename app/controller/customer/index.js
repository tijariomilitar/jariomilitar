const customerController = {};

customerController.index = async (req, res) => {
	res.render('customer/login');
};

customerController.home = async (req, res) => {
	res.render('customer/home');
};

module.exports = customerController;