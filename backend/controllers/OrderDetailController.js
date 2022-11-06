const orderDetailService = require('../services/OrderDetailService');

const getAllOrderDetail = async (req, res) => {
    const result = await orderDetailService.getAllOrderDetail();
    res.send(result);
}

const getOrderDetailById = async (req, res) => {
    let orderDetailId = req.params.orderDetailId;
    const result = await orderDetailService.getOrderDetailById(orderDetailId);
    res.send(result);
}

const addOrderDetail = async (req, res) => {
    let data = req.body;
    const result = await orderDetailService.addOrderDetail(data);
    res.send(result);
}

const updateOrderDetail = async (req, res) => {
    let data = req.body;
    const result = await orderDetailService.updateOrderDetail(data);
    res.send(result);
}

const deleteOrderDetail = async (req, res) => {
    let orderDetailId = req.params.orderDetailId;
    const result = await orderDetailService.deleteOrderDetail(orderDetailId);
    res.send("Deleted!");
}

module.exports = {
    getAllOrderDetail: getAllOrderDetail,
    getOrderDetailById: getOrderDetailById,
    addOrderDetail: addOrderDetail,
    updateOrderDetail: updateOrderDetail,
    deleteOrderDetail: deleteOrderDetail,
}