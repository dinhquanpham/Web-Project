const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const userDatabase = require('../database/models/Users');

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
                'insert into users(id, username, password, createdAt, updatedAt) value (28, "sangvm", "abcxyz", "2019-12-01T03:55:41.000", "2019-12-01T03:55:41.000")'
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

let updateUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await sequelize.query(
                'UPDATE users SET password = "pass" WHERE id = 18'
            );
            resolve(result);
        }
        catch (e) {
            reject(e);
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
    updateUser: updateUser,
    deleteUser : deleteUser,
}