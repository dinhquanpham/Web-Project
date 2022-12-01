const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const OrderDetail = require('../models/OderDetails');

let getOrderDetailById = async (orderDetailId) => {
    try {
        let result = await OrderDetail.findOne({
            where: {
                id : orderDetailId,
            }
        });
        return result;
    } catch (e) {
        console.log("Can't find orderDetail");
        return "Error";
    }
}

let getAllOrderDetail = async () => {
    try {
        let result = await OrderDetail.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addOrderDetail = async (data) => {

    // as soon as we creat the order, the infomation of product will be add to this table, with unique orderId
    try {
        var list = [];
        console.log(data[0]);
        for (i = 1; i < data.length; i++) {
            let result = await OrderDetail.create({
                id: data[i].id,
                orderNumber: data[i].orderNumber,
                price: data[i].price,
                orderId: data[0].id,
                productId: data[i].productId,
            });
            list.push(result)
        }

        return list;
    }
    catch (e){ 
        return "Error";
    }
}

let updateOrderDetail = async (data) => {
    //maybe this will not be used
    try {
        return null;
    }
    catch (e) {
        return "Error";
    }
}

let deleteOrderDetail = async (orderDetailId) => {
    try {
        let orderDetail = await OrderDetail.findOne({
            where: {
                id: orderDetailId,
            }
        });
        await orderDetail.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getOrderDetailById: getOrderDetailById,
    getAllOrderDetail: getAllOrderDetail,
    addOrderDetail: addOrderDetail,
    updateOrderDetail: updateOrderDetail,
    deleteOrderDetail : deleteOrderDetail,
}