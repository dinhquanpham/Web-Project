const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Product = require('../models/Products');

let getProductById = async (productId) => {
    try {
        let result = await Product.findOne({
            where: {
                id: productId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find product");
        return "Error";
    }
}

let getAllProductByCreatedTime = function () {
    return new Promise(async (resolve, reject) => {
        try {
            let searchResult = await sequelize.query(
                'SELECT * FROM products p ORDER BY createdAt DESC', {
                raw: true,
                type: QueryTypes.SELECT
            });
            return searchResult;
        } catch (e) {
            return "Error";
        }
    });
}

let getProductByAuthor = async (authorId) => {
    try {
        let id = authorId;
        let searchResult = await sequelize.query(
            'SELECT * FROM products p WHERE p.authorId LIKE ? ORDER BY createdAt DESC', {
            raw: true,
            replacements: [id],
            type: QueryTypes.SELECT
        });
        return searchResult;
    } catch (e) {
        return "Error";
    }
}

let getProductByProductSet = async (productSetId) => {
    try {
        let id = productSetId;
        let searchResult = await sequelize.query(
            'SELECT * FROM products p WHERE p.productsetId LIKE ? ORDER BY createdAt DESC', {
            raw: true,
            replacements: [id],
            type: QueryTypes.SELECT
        });
        return searchResult;
    } catch (e) {
        return "Error";
    }
}

let getProductBySoldNumber = async () => {
    try {
        let searchResult = await sequelize.query(
            'SELECT * FROM products p ORDER BY soldNumber DESC', {
            raw: true,
            type: QueryTypes.SELECT
        });
        return searchResult;
    } catch (e) {
        return "Error";
    }
}

let getAllProduct = async () => {
    try {
        let result = await Product.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addProduct = async (data) => {
    try {
        if (data.quantityInStock == 0) {
            soldStatus: 0;
        }
        let product = await Product.create({
            id: data.id,
            productName: data.productName,
            price: data.price,
            quantityInStock: data.quantityInStock,
            description: data.description,
            publishedYear: data.publishedYear,
            productSize: data.productSize,
            pageNumber: data.pageNumber,
            soldNumber: data.soldNumber,
            image: data.image,
            authorId: data.authorId,
            productSetId: data.productSetId,
            providerId: data.providerId
        })
        return product;
    }
    catch (e) {
        return "Error";
    }
}

let updateProduct = async (data) => {
    try {
        let product = await Product.findOne({
            where:
                { id: data.id }
        });

        product.set({
            id: data.id,
            productname: data.productname,
            price: data.price,
            quantityInStock: data.quantityInStock,
            description: data.description,
            publishedYear: data.publishedYear,
            productSize: data.productSize,
            image: data.image,
            soldStatus: data.soldStatus,
            pageNumber: data.pageNumber,
            soldNumber: data.soldNumber,
            authorId: data.authorId,
            productSetId: data.productSetId,
            providerId: data.providerId
        })
        await product.save();
        return product;
    }
    catch (e) {
        return "Error";
    }
}

let deleteProduct = async (productId) => {
    try {
        let product = await Product.findOne({
            where: {
                id: productId,
            }
        });
        await product.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getProductById: getProductById,
    getProductByProductSet: getProductByProductSet,
    getAllProductByCreatedTime: getAllProductByCreatedTime,
    getProductByAuthor: getProductByAuthor,
    getProductBySoldNumber: getProductBySoldNumber,
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}