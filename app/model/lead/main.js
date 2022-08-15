const db = require('../../../config/connection');

const Lead = function() {
	this.id = 0;
	this.datetime = "";
	this.name = "";
	this.email = "";
	this.phone = "";
	this.status = "";
	this.user_id = "";

	this.save = () => {
		let query = `INSERT INTO cms_wt_erp.customer_lead (datetime, name, email, phone) VALUES (
			'${this.datetime}', 
			'${this.name}', 
			'${this.email}', 
			'${this.phone}')`;
		return db(query);
	};
};

module.exports = Lead;