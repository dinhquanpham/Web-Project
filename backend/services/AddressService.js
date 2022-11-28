const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Address = require('../models/ShipAddress');

let getAddressById = async (addressId) => {
    try {
        let result = await Address.findOne({
            where: {
                id: addressId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find address");
        return "Error";
    }
}

let getAllAddress = async () => {
    try {
        let result = await Address.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addAddress = async (data) => {
    try {
        let result = await Address.create({
            id: data.id,
            province: data.province,
            district: data.district,
            street: data.street,
            homeAddress: data.homeAddress
        })
        return result;
    }
    catch (e) {
        return "Error";
    }
}

let updateAddress = async (data) => {
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
        return address;
    }
    catch (e) {
        return "Error";
    }
}

let deleteAddress = async (addressId) => {
    try {
        let address = await Address.findOne({
            where: {
                id: addressId,
            }
        });
        await address.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getAddressById: getAddressById,
    getAllAddress: getAllAddress,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
}