const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ProductCategory = require('../models/ProductCategories');

let getAllProductCategory = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await ProductCategory.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addProductCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await ProductCategory.create({
                productId: data.productId,
                categoryId: data.categoryId
            })
            resolve(user);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateProductCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productCategory = await ProductCategory.findOne({
                where: 
                {
                    productId : data.productId,
                    categoryId: data.categoryId
                }
            });
            
            productCategory.set({
                productId: data.productId,
                categoryId: data.categoryId
            })
            await productCategory.save();
            resolve(productCategory);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAllProductCategory: getAllProductCategory,
    addProductCategory: addProductCategory,
    updateProductCategory: updateProductCategory
}