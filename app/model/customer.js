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
	this.access = 'ctm'
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
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cpf like '%"+ cpf +"%';";
		return db(query);
	},
	cnpj: cnpj => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cnpj like '%"+ cnpj +"%';";
		return db(query);
	}
};

module.exports = Customer;