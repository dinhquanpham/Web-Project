require('dotenv/config');
const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "root", "Sang1234.",{
    dialect: "mysql",
    host: 3306
});

sequelize
	.sync()
	.then(() => {
		console.log('Connect to database successfully.');
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error);
	});

module.exports = sequelize;