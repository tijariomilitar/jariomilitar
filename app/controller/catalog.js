const User = require('../model/user');
const userController = require('./user');
const Product = require('../model/product');

const catalogController = {
	index: async (req, res) => {
		const productColors = await Product.colorList();
		res.render('catalog/index', { productColors: productColors });
	}
};

module.exports = catalogController;