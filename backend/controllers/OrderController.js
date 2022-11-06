const orderService = require('../services/OrderService');

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
    const result = await orderService.addOrder(data);
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