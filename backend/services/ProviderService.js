const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Provider = require('../models/Providers');

let getProviderById = async (providerId) => {
    try {
        let result = await Provider.findOne({
            where: {
                id : providerId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find provider");
        return "Error";
    }
}

let getAllProvider = async () => {
    try {
        let result = await Provider.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addProvider = async (data) => {
    try {
        let provider = await Provider.create({
            id: data.id,
            name: data.name
        })
        return provider;
    }
    catch (e){ 
        return "Error";
    }
}

let updateProvider = async (data) => {
    try {
        let provider = await Provider.findOne({
            where: 
            {id : data.id}
        });
        
        provider.set({
            id: data.id,
            name: data.name
        })
        await provider.save();
        return provider;
    }
    catch (e) {
        return "Error";
    }
}

let deleteProvider = async (providerId) => {
    try {
        let provider = await Provider.findOne({
            where: {
                id: providerId,
            }
        });
        await provider.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getProviderById: getProviderById,
    getAllProvider: getAllProvider,
    addProvider: addProvider,
    updateProvider: updateProvider,
    deleteProvider : deleteProvider,
}