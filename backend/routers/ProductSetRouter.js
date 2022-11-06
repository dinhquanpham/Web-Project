const express = require('express');
const productSetController = require('../controllers/ProductSetController');

let router = express.Router();

router.get('/', productSetController.getAllProductSet);
router.get('/:productSetId', productSetController.getProductSetById);
router.post('/add', productSetController.addProductSet);
router.put('/update', productSetController.updateProductSet);
router.delete('/delete/:productSetId', productSetController.deleteProductSet);

module.exports = router;
