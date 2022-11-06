const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const OrderDetail = require('../models/OderDetails');

let getOrderDetailById = async (orderDetailId) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await OrderDetail.findOne({
                where: {
                    id : orderDetailId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find orderDetail");
            reject(e);
        }
    });
}

let getAllOrderDetail = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await OrderDetail.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addOrderDetail = async (data) => {
    return new Promise(async (resolve, reject) => {
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
            resolve(orderDetail);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateOrderDetail = async (data) => {
    return new Promise(async (resolve, reject) => {
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
            resolve(orderDetail);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteOrderDetail = async (orderDetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderDetail = await OrderDetail.findOne({
                where: {
                    id: orderDetailId,
                }
            });
            await orderDetail.destroy();
            // let result = await sequelize.query(
            //     'DELETE FROM orderDetails WHERE id = 1'
            // );
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getOrderDetailById: getOrderDetailById,
    getAllOrderDetail: getAllOrderDetail,
    addOrderDetail: addOrderDetail,
    updateOrderDetail: updateOrderDetail,
    deleteOrderDetail : deleteOrderDetail,
}