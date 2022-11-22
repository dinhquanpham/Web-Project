const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Product = require('../models/Products');

let getProductById = async (productId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Product.findOne({
                where: {
                    id : productId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find product");
            reject(e);
        }
    });
}

let getProductByAuthor = function(authorId) {
    return new Promise(async (resolve, reject) => {
        try {
            let id = authorId;
            let searchResult = await sequelize.query(
                'SELECT * FROM products p WHERE p.authorId LIKE ? ORDER BY createdAt DESC', {
                    raw: true,
                    replacements: [id],
                    type: QueryTypes.SELECT
                });
            resolve(searchResult);
        } catch (e) {
            reject(e);
        }
    });
}

let getProductByProductSet = function(productSetId) {
    return new Promise(async (resolve, reject) => {
        try {
            let id = productSetId;
            let searchResult = await sequelize.query(
                'SELECT * FROM products p WHERE p.productsetId LIKE ? ORDER BY createdAt DESC', {
                    raw: true,
                    replacements: [id],
                    type: QueryTypes.SELECT
                });
            resolve(searchResult);
        } catch (e) {
            reject(e);
        }
    });
}

let getAllProduct = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Product.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
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
                authorId : data.authorId,
                productSetId: data.productSetId,
                providerId: data.providerId
            })
            resolve(product);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await Product.findOne({
                where: 
                {id : data.id}
            });
            
            product.set({
                id: data.id,
                productname: data.productname,
                price: data.price,
                quantityInStock: data.quantityInStock,
                description: data.description,
                publishedYear: data.publishedYear,
                productSize: data.productSize,
                soldStatus: data.soldStatus,
                pageNumber: data.pageNumber,
                authorId : data.authorId,
                productSetId: data.productSetId,
                providerId: data.providerId
            })
            await product.save();
            resolve(product);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteProduct = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await Product.findOne({
                where: {
                    id: productId,
                }
            });
            await product.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getProductById: getProductById,
    getProductByProductSet: getProductByProductSet,
    getProductByAuthor: getProductByAuthor,
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct : deleteProduct,
}