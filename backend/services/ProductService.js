const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Product = require('../models/Products');

let getProductById = async (productId) => {
    try {
        let product  = await sequelize.query(
            'select p.*, a.name as authorName, ps.name as setName from products p join authors a on p.authorId = a.id left join product_set ps on ps.id = p.productsetId where p.id = ?', {
            raw: true,
            replacements: [productId],
            type: QueryTypes.SELECT
            }
        )

        let categories = await sequelize.query(
            'select c2.name from products p join product_category pc on p.id = pc.productId' 
            + ' join categories c2 on c2.id = pc.categoryId where p.id = ?',{
                raw: true,
                replacements: [productId],
                type: QueryTypes.SELECT
            }
        )
        return result = {
            product: product,
            categories: categories,
        };
    } catch (e) {
        console.log("Can't find product");
        return "Error";
    }
}

let getAllProductByCreatedTime = async function () {
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
}

let getProductByCategory = async function(categoryId) {
    try {
        let searchResult = await sequelize.query(
            'select p.* from (product_category join categories c on c.id = product_category.categoryId join products' 
            + ' p on product_category.productId = p.id) where categoryId = ?;', {
                raw: true,
                replacements: [categoryId],
                type: QueryTypes.SELECT
            }
        );
        return searchResult;
    } catch (e) {
        return "Error";
    }
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
    getProductByCategory: getProductByCategory,
    getProductByProductSet: getProductByProductSet,
    getAllProductByCreatedTime: getAllProductByCreatedTime,
    getProductByAuthor: getProductByAuthor,
    getProductBySoldNumber: getProductBySoldNumber,
    getAllProduct: getAllProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}