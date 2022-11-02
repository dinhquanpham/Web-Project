const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Role = sequelize.define("role", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: false,
    }

})


module.exports = Role;
