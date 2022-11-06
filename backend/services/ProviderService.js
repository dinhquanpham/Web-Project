const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Provider = require('../models/Providers');

let getProviderById = async (providerId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Provider.findOne({
                where: {
                    id : providerId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find provider");
            reject(e);
        }
    });
}

let getAllProvider = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Provider.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addProvider = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let provider = await Provider.create({
                id: data.id,
                name: data.name
            })
            resolve(provider);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateProvider = async (data) => {
    return new Promise(async (resolve, reject) => {
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
            resolve(provider);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteProvider = async (providerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let provider = await Provider.findOne({
                where: {
                    id: providerId,
                }
            });
            await provider.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getProviderById: getProviderById,
    getAllProvider: getAllProvider,
    addProvider: addProvider,
    updateProvider: updateProvider,
    deleteProvider : deleteProvider,
}