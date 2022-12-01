const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');

let getOrderById = async (orderId) => {
    try {
        let result = await Order.findOne({
            where: {
                id : orderId
            }
        });
        resolve(result);
    } catch (e) {
        console.log("Can't find order");
        reject(e);
    }
}

let getAllOrder = async () => {
    try {
        let result = await Order.findAll();
        return result;
    } catch (e) {
        return "Error";
    }
}

let addOrder = async (data) => {
    try {
        let result = await Order.create({
            id: data.id,
            orderDate: data.orderDate,
            shippedDate: data.shippedDate,
            paidAmount: data.paidAmount,
            paidStatus: data.paidStatus,
            paidAt: data.paidAt,
            userId: data.userId
        })
        return result;
    }
    catch (e) {
        return "Error";
    }
}

let updateOrder = async (data) => {
    try {
        // we don't need update
        return null;
    } catch(e) {
        return "Error"
    }
}

let deleteOrder = async (orderId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: orderId,
            }
        });
        await order.destroy();
        let message = "Deleted";
        return message;
    }
    catch (e) {
        return "Error";
    }
}

module.exports = {
    getOrderById: getOrderById,
    getAllOrder: getAllOrder,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder : deleteOrder,
}