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
    try {
        let orderDetail = await OrderDetail.create({
            id: data.id,
            orderDate: data.orderDate,
            shippedDate: data.shippedDate,
            paidAmount: data.paidAmount,
            paidStatus:data.paidStatus,
            paidAt: data.paidAt,
            userId: data.userId
        })
        return orderDetail;
    }
    catch (e){ 
        return "Error";
    }
}

let updateOrderDetail = async (data) => {
    try {
        let orderDetail = await OrderDetail.findOne({
            where: 
            {id : data.id}
        });
        
        orderDetail.set({
            id: data.id,
            orderDate: data.orderDate,
            shippedDate: data.shippedDate,
            paidAmount: data.paidAmount,
            paidStatus:data.paidStatus,
            paidAt: data.paidAt,
            userId: data.userId
        })
        await orderDetail.save();
        return orderDetail;
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