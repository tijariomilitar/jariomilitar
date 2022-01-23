const db = require('../../config/connection');
const lib = require('jarmlib');

const Product = function(){
	this.id = 0;
	this.code = "";
	this.name = "";
	this.color = "";
	this.size = "";
	this.weight = 0;
	this.brand = "";
	// this.image;
	this.status = "";
	this.announcement = "";
};

Product.findById = async (id) => {
	let query = "SELECT * FROM cms_wt_erp.product WHERE id='"+id+"';";
	return db(query);
};

Product.filter = async (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product product")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Product.image = {
	list: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_image WHERE product_id='"+id+"';";
		return db(query);
	}
};

Product.package = function(){
	this.id = 0;
	this.code = "";
	this.name = "";
	this.color = "";
	this.weight = 0;
	this.brand = "";
	this.image = "";
	this.status = "";
	this.announcement = "";
};

Product.package.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product_package package")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Product.package.product = function(){
	this.id = 0;
	this.package_id = 0;
	this.product_id = 0;
	this.amount = 0;
}

Product.package.image = {
	list: (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_package_image WHERE package_id='"+id+"';";
		return db(query);
	}
};

Product.package.product.filter = (props, inners, params, strict_params, order_params) => {
	let query = new lib.Query().select().props(props).table("cms_wt_erp.product_package_product product_package_product")
		.inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
	return db(query);
};

Product.colorList = async () => {
	let query = "SELECT * FROM cms_wt_erp.product_color;";
	return db(query);
};

module.exports = Product;