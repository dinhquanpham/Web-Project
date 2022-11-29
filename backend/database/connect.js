const Sequelize = require("sequelize");

const sequelize = new Sequelize("db", "root", "dinhquan",{
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