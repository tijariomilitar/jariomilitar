const db = require('../../../config/connection');
const Sale = {};

const lib = require("jarmlib");

Sale.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.sale sale").inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

Sale.product = {
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_product WHERE sale_id='"+sale_id+"';";
		return db(query);		
	}
};

Sale.package = {
	list: async (sale_id) => {
		let query = "SELECT * FROM cms_wt_erp.sale_package WHERE sale_id='"+sale_id+"';";
		return db(query);
	},
	product: {
		list: async (sale_id, package_id) => {
			let query = "SELECT * FROM cms_wt_erp.sale_package_product WHERE sale_id='"+sale_id+"' AND package_id='"+package_id+"';";
			return db(query);
		}
	}
};

module.exports = Sale;