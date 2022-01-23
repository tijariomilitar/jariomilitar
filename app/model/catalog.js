const db = require('../../config/connection');
const lib = require('jarmlib');

const Catalog = function(){
	this.id = 0;
	this.name = "";
};

Catalog.filter = async (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product_price_category catalog")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

module.exports = Catalog;