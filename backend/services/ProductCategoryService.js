const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ProductCategory = require('../models/ProductCategories');

let getAllProductCategory = async () => {
    try {
        let result = await ProductCategory.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addProductCategory = async (data) => {
    try {
        let user = await ProductCategory.create({
            productId: data.productId,
            categoryId: data.categoryId
        })
        return user;
    }
    catch (e) { 
        return "Error";
    }
}

let updateProductCategory = async (data) => {
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
        return productCategory;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getAllProductCategory: getAllProductCategory,
    addProductCategory: addProductCategory,
    updateProductCategory: updateProductCategory
}