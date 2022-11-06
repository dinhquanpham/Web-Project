const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Category = require('../models/Categories');

let getCategoryById = async (categoryId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Category.findOne({
                where: {
                    id : categoryId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find category");
            reject(e);
        }
    });
}

let getAllCategory = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Category.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.create({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            resolve(category);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.findOne({
                where: 
                {id : data.id}
            });
            
            category.set({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            await category.save();
            resolve(category);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteCategory = async (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Category.findOne({
                where: {
                    id: categoryId,
                }
            });
            await category.destroy();
            // let result = await sequelize.query(
            //     'DELETE FROM categorys WHERE id = 1'
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
    getCategoryById: getCategoryById,
    getAllCategory: getAllCategory,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory : deleteCategory,
}