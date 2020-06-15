var mysql = require("mysql");

class DbHelpers {
	viewAllEmployees(cnt) {
		cnt.query("SELECT * FROM employee", (err, data) => {
			console.table(data);
		});
	}
}

module.exports = DbHelpers;
