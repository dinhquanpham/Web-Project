const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.NAME, process.env.PASSWORD,{
    dialect: "mysql",
    host: 3306,
});

sequelize
    .sync()
    .then(() => {
        console.log("Connect to database successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

module.exports = sequelize;