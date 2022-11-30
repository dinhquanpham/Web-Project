const productService = require('../services/ProductService');

const getAllProduct = async (req, res) => {
    const result = await productService.getAllProduct();
    res.send(result);
}

const getProductById = async (req, res) => {
    let productId = req.params.productId;
    const result = await productService.getProductById(productId);
    res.send(result);
}

const getProductByCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    const result = await productService.getProductByCategory(categoryId);
    res.send(result);
}
const getAllProductByCreatedTime = async(req, res) => {
    const result = await productService.getAllProductByCreatedTime();
    res.send(result)
}

const getProductByProductSet = async(req, res) => {
    let productSetId = req.params.productSetId;
    const result = await productService.getProductByProductSet(productSetId);
    res.send(result);
}

const getProductByAuthor = async(req, res) => {
    let authorId = req.params.authorId;
    const result = await productService.getProductByAuthor(authorId);
    res.send(result);
}

const getProductBySoldNumber = async(req, res) => {
    const result = await productService.getProductBySoldNumber();
    res.send(result);
}

const addProduct = async (req, res) => {
    let data = req.body;
    const result = await productService.addProduct(data);
    res.send(result);
}

const updateProduct = async (req, res) => {
    let data = req.body;
    const result = await productService.updateProduct(data);
    res.send(result);
}

const deleteProduct = async (req, res) => {
    let productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    res.send("Deleted!");
}

module.exports = {
    getAllProduct: getAllProduct,
    getProductById: getProductById,
    getProductByCategory: getProductByCategory,
    getAllProductByCreatedTime: getAllProductByCreatedTime,
    getProductByProductSet: getProductByProductSet,
    getProductBySoldNumber: getProductBySoldNumber,
    getProductByAuthor: getProductByAuthor,
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}