const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const User = sequelize.define("user", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    username:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    password:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    firstname:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    middlename:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    lastname:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    address:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    phone:{
        type: Sequelize.STRING,
        allowNull: true,
    }

})

module.exports = User;