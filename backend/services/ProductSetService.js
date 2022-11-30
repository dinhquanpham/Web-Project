const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ProductSet = require('../models/ProductSets');

let getProductSetById = async (productSetId) => {
    try {
        let result = await sequelize.query(
            'select ps.id, ps.name, ps.newestChap, ps.image, a.name as authorName, p.name as providerName from product_set ps join authors a on ps.authorId = a.id join providers p on ps.providerId = p.id where ps.id = ?',{
                raw: true,
                replacements: [productSetId],
                type: QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        console.log("Can't find productSet");
        return "Error";
    }
}

let getAllProductSet = async () => {
    try {
        let result = await sequelize.query(
            'select ps.id, ps.name, ps.newestChap, ps.image, a.name as authorName, p.name as providerName from product_set ps join authors a on ps.authorId = a.id join providers p on ps.providerId = p.id',{
                raw: true,
                type: QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductSetByProvider = async (providerId) => {
    try {
        let id = providerId;
        let searchResult = await sequelize.query(
            'SELECT * FROM product_set p WHERE p.providerId LIKE ?', {
                raw: true,
                replacements: [id],
                type: QueryTypes.SELECT
            });
        return searchResult;
    } catch (e) {
        return "Error";
    }
}

let addProductSet = async (data) => {
    try {
        let result = await ProductSet.create({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: data.newestChap,
            image: data.image,
            providerId: data.providerId,
            authorId: data.authorId
        })
        return result;
    }
    catch (e) {
        return "Error";
    }
}

let updateProductSet = async (data) => {
    try {
        let productSet = await ProductSet.findOne({
            where:
                { id: data.id }
        });

        productSet.set({
            id: data.id,
            name: data.name,
            description: data.description,
            newestChap: data.newestChap,
            image: data.image,
            providerId: data.providerId,
            authorId: data.authorId
        })
        await productSet.save();
        return productSet;
    }
    catch (e) {
        return "Error";
    }
}

let deleteProductSet = async (productSetId) => {
    try {
        let productSet = await ProductSet.findOne({
            where: {
                id: productSetId,
            }
        });
        await productSet.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getProductSetById: getProductSetById,
    getAllProductSet: getAllProductSet,
    getProductSetByProvider: getProductSetByProvider,
    addProductSet: addProductSet,
    updateProductSet: updateProductSet,
    deleteProductSet: deleteProductSet,
}