const mysql = require('mysql');
const dbconfig = require('./database');

// environments: development | production
const pool  = mysql.createPool({
	connectionLimit : 20,
	host : dbconfig.production.database.host,
	port : dbconfig.production.database.port,
	user : dbconfig.production.database.user,
	password : dbconfig.production.database.password
});

const db = async (query) => {
	return new Promise(async (resolve, reject) => {
		pool.getConnection((err, connection) => {
		    connection.query(query, (err, rows) => {
		        connection.release();
		        if(!err){
		        	resolve(rows)
		        } else {
		        	console.log(err);
		        	reject(err);
		        };
		    });
		});
	});
};

module.exports = db;
// 123123
// $2a$10$0YS2Tf4F1cbsMFWjX5X9/.Eo/UcfMiMHMUF0XLi6.WILoMRFMNcIu

// $2a$10$kWkzCcgXG/U29wLTJYBfP.yxS9EzQ6Da1MRjHjruA7iFWZK940EuO