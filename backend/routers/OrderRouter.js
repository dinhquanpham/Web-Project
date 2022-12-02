const express = require('express');
const orderController = require('../controllers/OrderController');

let router = express.Router();

router.get('/', orderController.getAllOrder);
router.get('/by-id/:orderId', orderController.getOrderById);
router.get('/by-user/:userId', orderController.getOrderByUser);
router.post('/add', orderController.addOrder);
router.put('/update', orderController.updateOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);

// Maybe the order flow will be configuration in here(add product and do calculate thing)
// Post method will be call, and the repository will save this list Data(array or list) idk?

module.exports = router;
