const express = require('express');
const productController = require('../controllers/ProductController');

let router = express.Router();

router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getProductById);
router.post('/add', productController.addProduct);
router.put('/update', productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);

module.exports = router;
