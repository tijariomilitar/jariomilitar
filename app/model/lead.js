const db = require('../../config/connection');
const lib = require('jarmlib');

const Lead = function(){
	this.id = 0;
	this.name = '';
	this.email = '';

	this.save = () => {
		if(!this.name){ return "[MODEL:Lead:SAVE]Nome é obrigatório" };
		if(!this.email){ return "[MODEL:Lead:SAVE]Email é obrigatório" };

		let query = "INSERT INTO cms_wt_erp.lead (name, email) VALUES ('"
			+this.name+"', '"
			+this.email+"');";
		return db(query);
	};
};

module.exports = Lead;