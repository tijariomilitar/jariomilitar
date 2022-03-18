const customerController = {};

customerController.index = async (req, res) => {
	res.render('customer/index');
};

module.exports = customerController;