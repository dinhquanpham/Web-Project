const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Authors = require('../models/Authors');
const Category = require('../models/Categories');
const ProductCategories = require('../models/ProductCategories');
const Product = require('../models/Products');

let getProductById = async (productId) => {
    try {
        let product = await sequelize.query(
            'select p.*, a.name as authorName, ps.name as setName, pr.name as providerName '
            + 'from products p join authors a on p.authorId = a.id left join product_set ps on ps.id = p.productsetId join providers pr on pr.id = p.providerId where p.id = ?', {
            raw: true,
            replacements: [productId],
            type: QueryTypes.SELECT
        })

        let categories = await sequelize.query(
            'select c2.name from products p join product_category pc on p.id = pc.productId'
            + ' join categories c2 on c2.id = pc.categoryId where p.id = ?', {
            raw: true,
            replacements: [productId],
            type: QueryTypes.SELECT
        })

        return result = {
            product: product,
            categories: categories
        };
    } catch (e) {
        console.log("Can't find product");
        return errorCause = {
            error:e.name,
        };
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
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let getProductByCategory = async function (categoryId, page, size) {
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
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }

        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
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
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }

        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
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
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
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
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let getAllProduct = async (page, size) => {
    try {
        let result = await Product.findAll();
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let getProductInfo = async () => {
    try {
        let products = await sequelize.query(
            'select p.id, p.productName, p.price, p.quantityInStock, p.publishedYear, p.productSize, p.pageNumber, p.image, p.soldNumber, p.soldStatus, a.name as authorName, pv.name providerName, ps.name as setName'
            + ' from products p'
            + ' join authors a on a.id = p.authorId'
            + ' join providers pv on pv.id = p.providerId'
            + ' left join product_set ps on ps.id = p.productsetId'
            + ' order by p.id;', {
            raw: true,
            type: QueryTypes.SELECT
        });

        let authors = await sequelize.query(
            'select name from authors', {
            raw: true,
            type: QueryTypes.SELECT
        });

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
        });

        let categories = await sequelize.query(
            'select name from categories', {
            raw: true,
            type: QueryTypes.SELECT
        }
        )

        let authorList = [];
        for (let i = 0; i < authors.length; i++) {
            authorList.push(authors[i].name);
        }
        let providerList = [];
        for (let i = 0; i < providers.length; i++) {
            providerList.push(providers[i].name);
        }
        let setList = [];
        for (let i = 0; i < sets.length; i++) {
            setList.push(sets[i].name);
        }
        let categoryList = [];
        for (let i = 0; i < categories.length; i++) {
            categoryList.push(categories[i].name);
        }
        return result = {
            products: products,
            authors: authorList,
            providers: providerList,
            sets: setList,
            categories: categoryList
        };
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let addProductAdmin = async (data) => {
    try {
        let id = await sequelize.query(
            'select (select id from authors where name = :authorName) as authorId,'
            + ' (select id from providers where name = :providerName) as providerId,'
            + ' (select id from product_set where name = :setName) as setId',
            {
                raw: true,
                replacements: {
                    authorName: data.authorName,
                    providerName: data.providerName,
                    setName: data.setName
                },
                type: QueryTypes.SELECT
            });
        let authorId = id[0].authorId;
        let providerId = id[0].providerId;
        let setId = id[0].setId;

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
            authorId: authorId,
            productsetId: setId,
            providerId: providerId
        });
        let productId = product.id;
        let categoryData = data.categories;
        let idList = await sequelize.query(
        'select id from categories where name in (?)',
        {
            raw: true,
            replacements: [categoryData],
            type: QueryTypes.SELECT
        });
        let categoryIdList = [];
        for (let i = 0; i < idList.length; i++) {
            categoryIdList.push(idList[i].id);
        }
        let list = [];
        if (categoryData != null) {
            for (let i = 0; i < categoryIdList.length; i++) {
                let catId = categoryIdList[i];
                let res;
                let proCat = await ProductCategories.findOne({
                    where: {
                        productId: productId,
                        categoryId: catId
                    }
                });
                if (proCat != null) {
                    res = proCat;
                } else {
                    res = await ProductCategories.create({
                        productId: prodId,
                        categoryId: catId
                    });
                }
                list.push(res);
            }
        }

        return result = {
            product: product,
            categories: list
        }
    } catch(e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let addProduct = async (data) => {
    try {
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
            authorId: id,
            productSetId: data.productSetId,
            providerId: data.providerId
        })
        return product;
    }
    catch (e) {
        return errorCause = {
            error:e.name,
        };
    }
}

let updateProduct = async (data) => {
    try {
        let product = await Product.findOne({
            where:
                { id: data.id }
        });

        let categoryData = data.categories;
        let productCategoryList = [];
        if (categoryData != null) {
            for (let i = 0; i < categoryData.length; i++) {

                let catId = categoryData[i];
                let prodId = data.id;

                let proCat = await ProductCategories.findOne({
                    where: {
                        productId: prodId,
                        categoryId: catId
                    }
                });
                let res;
                if (proCat != null) {
                    res = proCat;
                } else {
                    res = await ProductCategories.create({
                        productId: prodId,
                        categoryId: catId
                    })
                }
                productCategoryList.push(res);
            }
        }

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

        if (categoryData != null) {
            return res = {
                product: product,
                productCategory: productCategoryList
            };
        }
        else {
            return product;
        }
    } catch (e) {
        return errorCause = {
            error:e.name,
        };
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
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        return errorCause = {
            error:e.name,
        };
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
    addProductAdmin: addProductAdmin,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}