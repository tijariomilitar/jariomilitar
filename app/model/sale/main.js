const db = require('../../../config/connection');
const Sale = {};

const lib = require("jarmlib");

Sale.filter = (props, inners, period, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.sale sale").inners(inners).period(period).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

module.exports = Sale;