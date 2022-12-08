const orderService = require('../services/OrderService');
const orderDetailService = require('../services/OrderDetailService')

const getAllOrder = async (req, res) => {
    const result = await orderService.getAllOrder();
    res.send(result);
}

const getOrderById = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.getOrderById(orderId);
    res.send(result);
}

const getOrderByUser = async (req, res) => {
    let userId = req.params.userId;
    const result = await orderService.getOrderByUser(userId);
    res.send(result);
}
 
const addOrder = async (req, res) => {
    let data = req.body;

    
    let orderData = data[0];
    let productData = data;

    const order = await orderService.addOrder(orderData);
    data[0] = order;
    const product = await orderDetailService.addOrderDetail(productData);

    if (data[0].paymentId == 2) {
        res.send("Đơn hàng của bạn đã được tiếp nhận")
    }
    else {
        let amount = data[0].paidAmount;
        let url = process.env.PAYMENT_QR_URL + amount + '&accountName=' + process.env.PAYMENT_QR_ACCOUNTNAME;
        console.log(url);
        res.redirect(url);
    }
    
}

const updateOrder = async (req, res) => {
    let data = req.body;
    const result = await orderService.updateOrder(data);
    res.send(result);
}

const deleteOrder = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.deleteOrder(orderId);
    res.send(result);
}

module.exports = {
    getAllOrder: getAllOrder,
    getOrderByUser, getOrderByUser,
    getOrderById: getOrderById,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
}