const db = require('../../config/connection');
const lib = require("jarmlib");

const Customer = function(){
	this.id;
	this.name;
	this.trademark;
	this.cnpj;
	this.email;
	this.phone;
	this.password;
	this.access = 'ctm';
};

Customer.findBy = {
	id: id => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE id='"+ id +"';";
		return db(query);
	},
	trademark: trademark => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE trademark='"+ trademark +"';";
		return db(query);
	},
	cpf: cpf => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cpf='"+cpf+"';";
		return db(query);
	},
	cnpj: cnpj => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cnpj='"+cnpj+"';";
		return db(query);
	},
	token: token => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE token='"+token+"';";
		return db(query);
	}
};

Customer.setToken = (token, customer_id) => {
	let query = "UPDATE cms_wt_erp.customer SET token='"+token+"' WHERE id='"+customer_id+"';";
	return db(query);
};

Customer.destroyToken = token => {
	let query = "UPDATE cms_wt_erp.customer SET token='' WHERE token='"+token+"';";
	return db(query);
};

Customer.updatePassword = (customer) => {
	let query = "UPDATE cms_wt_erp.customer SET password='"+customer.password+"' WHERE id='"+customer.id+"';";
	return db(query);
};

module.exports = Customer;