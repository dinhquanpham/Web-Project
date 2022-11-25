const express = require('express');
const orderDetailController = require('../controllers/OrderDetailController');

let router = express.Router();

router.get('/', orderDetailController.getAllOrderDetail);
router.get('/by-id/:orderDetailId', orderDetailController.getOrderDetailById);
router.post('/add', orderDetailController.addOrderDetail);
router.put('/update', orderDetailController.updateOrderDetail);
router.delete('/delete/:orderDetailId', orderDetailController.deleteOrderDetail);

module.exports = router;
