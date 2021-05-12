const db = require('../../config/connection');

const User = function(){
	this.id;
	this.name;
	this.email;
	this.phone;
	this.password;
	this.birth;
	this.department;
	this.role;
	this.access = '000-000' //no access;
};

User.save = (user) => {
	let query = "INSERT INTO cms_wt_erp.user (name, email, password) values ('"
        +user.name+"', '"
        +user.email+"', '"
        +user.password+"')";
    console.log(query);
    return db(query);
};

// User.updateName = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET name='"+user.name+"' WHERE id='"+user.id+"';";
// 	// let query = "UPDATE cms_wt_erp.user SET name='"+user.name+"', name='"+user.name+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateEmail = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updatePassword = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

// User.updateDepartment = (user) => {
// 	let query = "UPDATE cms_wt_erp.user SET department='"+user.department+"', role='"+user.role+"' WHERE id='"+user.id+"';";
//     return db(query);
// };

User.list = () => {
	let query = "SELECT * FROM cms_wt_erp.user;";
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM cms_wt_erp.user WHERE id='"+id+"';";
	return db(query);
};

User.findByUsername = (user) => {
	let query = "SELECT * FROM cms_wt_erp.user WHERE username='"+user.username+"';";
	return db(query);
};

User.findByEmail = (email) => {
	let query = "SELECT * FROM cms_wt_erp.user WHERE email='"+email+"';";
	return db(query);
};

User.updateAccess = (user) => {
	let query = "UPDATE cms_wt_erp.user SET access='"+user.newAccess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updatePassword = (user) => {
	let query = "UPDATE cms_wt_erp.user SET password='"+user.password+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updateInfo = (user) => {
	let query = "";
	if(user.email && user.birth){
		query = "UPDATE cms_wt_erp.user SET email='"+user.email+"', birth='"+user.birth+"' WHERE id='"+user.id+"';";
	} else if(user.email && !user.birth){
		query = "UPDATE cms_wt_erp.user SET email='"+user.email+"' WHERE id='"+user.id+"';";
	} else if(!user.email && user.birth){
		query = "UPDATE cms_wt_erp.user SET birth='"+user.birth+"' WHERE id='"+user.id+"';";
	};
	return db(query);
};

module.exports = User;