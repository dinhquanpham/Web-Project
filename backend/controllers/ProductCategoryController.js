const productCategoryService = require('../services/ProductCategoryService');

const getAllProductCategory = async (req, res) => {
    const result = await productCategoryService.getAllProductCategory();
    res.send(result);
}

const addProductCategory = async (req, res) => {
    let data = req.body;
    const result = await productCategoryService.addProductCategory(data);
    res.send(result);
}

const updateProductCategory = async (req, res) => {
    let data = req.body;
    const result = await productCategoryService.updateProductCategory(data);
    res.send(result);
}


module.exports = {
    getAllProductCategory: getAllProductCategory,
    addProductCategory: addProductCategory,
    updateProductCategory: updateProductCategory
}