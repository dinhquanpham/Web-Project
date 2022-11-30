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

let createNewOrder = async(userId) => {
    //Todo: Create a new Order to store product
    return null;
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
        // Add Order infomation like total price, product quantity and something else into created order (by getting created order info)
        return null;
    } catch(e) {
        return "Error"
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