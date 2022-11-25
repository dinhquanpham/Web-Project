const express = require('express');
const orderController = require('../controllers/OrderController');

let router = express.Router();

router.get('/', orderController.getAllOrder);
router.get('/by-id:orderId', orderController.getOrderById);
router.post('/add', orderController.addOrder);
router.put('/update', orderController.updateOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
