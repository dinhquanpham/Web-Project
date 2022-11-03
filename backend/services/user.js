const e = require('express');
const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const userDatabase = require('../entity/User');

let getAllUser = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await sequelize.query("SELECT * FROM users", {
                type: QueryTypes.SELECT
            })
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await sequelize.query(
                'insert into users(id, username, password) value (10, "lmaokai", "abcc")'
            );
            resolve(result);
        }
        // try {
        //     let result = await userDatabase.create( {
        //         username: "user",
        //         password: "abcxyz",
        //         firstname: "John",
        //         middlename: "Smith"
        //     });
        //     resolve(result);
        // }
        catch (e){ 
            reject (e);
        }
    });
}

let deleteUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await sequelize.query(
                'DELETE FROM users WHERE id = 1'
            );
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAllUser: getAllUser,
    addUser: addUser,
    deleteUser : deleteUser,
}