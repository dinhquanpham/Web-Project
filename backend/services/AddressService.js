const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Address = require('../models/ShipAddress');

let getAddressById = async (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Address.findOne({
                where: {
                    id: addressId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find address");
            reject(e);
        }
    });
}

let getAllAddress = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Address.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addAddress = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Address.create({
                id: data.id,
                province: data.province,
                district: data.district,
                street: data.street,
                homeAddress: data.homeAddress
            })
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

let updateAddress = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let address = await Address.findOne({
                where:
                    { id: data.id }
            });

            user.set({
                id: data.id,
                province: data.province,
                district: data.district,
                street: data.street,
                homeAddress: data.homeAddress
            })
            await address.save();
            resolve(address);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteAddress = async (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let address = await Address.findOne({
                where: {
                    id: addressId,
                }
            });
            await address.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAddressById: getAddressById,
    getAllAddress: getAllAddress,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
}