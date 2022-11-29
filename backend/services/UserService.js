const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ShipAddress = require('../models/ShipAddress');
const User = require('../models/Users');

let getUserInfo = async (userId) => {
    try {
        let user = await User.findOne({
            where: {
                id : userId,
            }
        });
        let address = await sequelize.query(
            "select * from ship_address where userId = ?", {
            raw: true,
            replacements: [userId],
            type: QueryTypes.SELECT 
            }
        )
        let result = {
            user: user,
            address: address
        }
        return result; 
    } catch (e) {
        return "Error";
    }
} 

let getUserById = async (userId) => {
    try {
        let result = await User.findOne({
            where: {
                id : userId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find user");
        return "Error";
    }
}

let getUserByUsernameAndPassword = async (data) => {
    try {
        let result = await User.findOne({
            where: {
                username: data.username,
                password: data.password
            }
        });
        return result;
    } catch (e) {
        return "Error";
    }
}

let getUserByUsername = async() => {
    try {
        let result = await sequelize.query(
            "select * from users where id = 1"
        );
        return result;
    }
    catch (e) {
        return "Error";
    }
}

let getUserByRole = function(roleId) {
    return null;
}

let getAllUser = async () => {
    try {
        let result = await User.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addUser = async (data) => {
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
        return user;
    }
    catch (e){ 
        return "Error";
    }
}

let updateUser = async (data) => {
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
        return user;
    }
    catch (e) {
        return "Error";
    }
}

let deleteUser = async (userId) => {
    try {
        let user = await User.findOne({
            where: {
                id: userId,
            }
        });
        await user.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getUserInfo: getUserInfo,
    getUserById: getUserById,
    getUserByUsernameAndPassword : getUserByUsernameAndPassword,
    getAllUser: getAllUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser : deleteUser,
    getUserByUsername: getUserByUsername,
}