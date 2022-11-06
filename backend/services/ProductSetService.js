const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ProductSet = require('../models/ProductSets');

let getProductSetById = async (productSetId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await ProductSet.findOne({
                where: {
                    id: productSetId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find productSet");
            reject(e);
        }
    });
}

let getAllProductSet = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await ProductSet.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addProductSet = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await ProductSet.create({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

let updateProductSet = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productSet = await ProductSet.findOne({
                where:
                    { id: data.id }
            });

            user.set({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            await ProductSet.save();
            resolve(productSet);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteProductSet = async (productSetId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productSet = await ProductSet.findOne({
                where: {
                    id: productSetId,
                }
            });
            await productSet.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getProductSetById: getProductSetById,
    getAllProductSet: getAllProductSet,
    addProductSet: addProductSet,
    updateProductSet: updateProductSet,
    deleteProductSet: deleteProductSet,
}