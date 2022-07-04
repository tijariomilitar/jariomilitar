const db = require('../../../config/connection');

// const lib = require("jarmlib");

const Lead = function() {
	this.id = 0;
	this.datetime = "";
	this.name = "";
	this.email = "";
	this.phone = "";

	this.save = () => {
		let query = `INSERT INTO cms_wt_erp.lead_lp (datetime, name, email, phone) VALUES (
			'${this.datetime}', 
			'${this.name}', 
			'${this.email}', 
			'${this.phone}')`;
		return db(query);
	};
};

module.exports = Lead;