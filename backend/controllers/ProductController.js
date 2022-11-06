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
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}