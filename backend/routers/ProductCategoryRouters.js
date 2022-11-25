const express = require('express');
const productCategoryController = require('../controllers/ProductCategoryController');

let router = express.Router();

router.get('/', productCategoryController.getAllProductCategory);
router.post('/add', productCategoryController.addProductCategory);
router.put('/update', productCategoryController.updateProductCategory);

module.exports = router;
