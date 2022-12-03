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
            categories: categories
        };
    } catch (e) {
        console.log("Can't find product");
        return "Error";
    }
}

let getAllProductByCreatedTime = async function (page, size) {
    try {
        let result = await sequelize.query(
            'SELECT * FROM products p ORDER BY createdAt DESC', {
            raw: true,
            type: QueryTypes.SELECT
        });
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductByCategory = async function(categoryId, page, size) {
    try {
        let result = await sequelize.query(
            'select p.* from (product_category join categories c on c.id = product_category.categoryId join products' 
            + ' p on product_category.productId = p.id) where categoryId = ?;', {
                raw: true,
                replacements: [categoryId],
                type: QueryTypes.SELECT
            }
        );

        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }

        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductByAuthor = async (authorId, page, size) => {
    try {
        let id = authorId;
        let result = await sequelize.query(
            'SELECT * FROM products p WHERE p.authorId LIKE ? ORDER BY p.id DESC', {
            raw: true,
            replacements: [id],
            type: QueryTypes.SELECT
        });

        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }

        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductByProductSet = async (productSetId, page, size) => {
    try {
        let id = productSetId;
        let result = await sequelize.query(
            'SELECT * FROM products p WHERE p.productsetId LIKE ? ORDER BY p.id DESC', {
            raw: true,
            replacements: [id],
            type: QueryTypes.SELECT
        });
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductBySoldNumber = async (page, size) => {
    try {
        let result = await sequelize.query(
            'SELECT * FROM products p ORDER BY soldNumber DESC', {
            raw: true,
            type: QueryTypes.SELECT
        });
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return "Error";
    }
}

let getAllProduct = async (page, size) => {
    try {
        let result = await Product.findAll();
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return "Error";
    }
}

let getProductInfo = async () => {
    try {

        let products = await sequelize.query(
            'select p.id, p.productName, p.price, p.quantityInStock, p.publishedYear, p.productSize, p.pageNumber, p.image, p.soldStatus, a.name as authorName, pv.name providerName, ps.name as setName'
            + ' from products p'
            + ' join authors a on a.id = p.authorId'
            + ' join providers pv on pv.id = p.providerId'
            + ' left join product_set ps on ps.id = p.productsetId'
            + ' order by p.id;', {
                raw : true,
                type: QueryTypes.SELECT
            }
        );

        let authors = await sequelize.query(
            'select name from authors', {
                raw: true,
                type: QueryTypes.SELECT
            }
        );

        let providers = await sequelize.query(
            'select name from providers', {
                raw: true,
                type: QueryTypes.SELECT
            }
        );

        let sets = await sequelize.query(
            'select name from product_set', {
                raw: true,
                type: QueryTypes.SELECT
            }
        );

        return result = {
            products: products,
            authors: authors,
            providers: providers,
            sets: sets
        };
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
    getProductInfo: getProductInfo,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}