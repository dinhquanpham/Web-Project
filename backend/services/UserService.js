const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const User = require('../models/Users');

let getUserById = async (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await User.findOne({
                where: {
                    id : userId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find user");
            reject(e);
        }
    });
}

let getAllUser = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await User.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.create({
                id: data.id,
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                address: data.address,
                phone: data.phone,
            })
            resolve(user);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                where: 
                {id : data.id}
            });
            
            user.set({
                id: data.id,
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                middlename: data.middlename,
                lastname: data.lastname,
                address: data.address,
                phone: data.phone,
            })
            await user.save();
            resolve(user);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                }
            });
            await user.destroy();
            // let result = await sequelize.query(
            //     'DELETE FROM users WHERE id = 1'
            // );
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getUserById: getUserById,
    getAllUser: getAllUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser : deleteUser,
}