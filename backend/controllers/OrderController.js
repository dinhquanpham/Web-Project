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

const addOrder = async (req, res) => {
    let data = req.body;



    let orderData = data[0];
    let productData = data;

    const order = await orderService.addOrder(orderData);
    data[0] = order;
    const product = await orderDetailService.addOrderDetail(productData);

    const result = {
        order: order,
        product: product
    }

    res.send(result);
}

const updateOrder = async (req, res) => {
    let data = req.body;
    const result = await orderService.updateOrder(data);
    res.send(result);
}

const deleteOrder = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.deleteOrder(orderId);
    res.send("Deleted!");
}

module.exports = {
    getAllOrder: getAllOrder,
    getOrderById: getOrderById,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
}