const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');

let getOrderById = async (productId) => {
    try {
        let result = await Order.findOne({
            where: {
                id : productId,
            }
        });
        resolve(result);
    } catch (e) {
        console.log("Can't find product");
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
        let order = await Order.create({
            id: data.id,
            productname: data.productname,
            price: data.price,
            quantityInStock: data.quantityInStock,
            description: data.description,
            publishedYear: data.publishedYear,
            productSize: data.productSize,
            authorId : data.authorId,
            productSetId: data.productSetId,
            providerId: data.providerId
        })
        return order;
    }
    catch (e) { 
        return "Error";
    }
}

let updateOrder = async (data) => {
    try {
        let order = await Order.findOne({
            where: 
            {id : data.id}
        });
        
        order.set({
            id: data.id,
            productname: data.productname,
            price: data.price,
            quantityInStock: data.quantityInStock,
            description: data.description,
            publishedYear: data.publishedYear,
            productSize: data.productSize,
            authorId : data.authorId,
            productSetId: data.productSetId,
            providerId: data.providerId
        })
        await order.save();
        return order;
    }
    catch (e) {
        return "Error";
    }
}

let deleteOrder = async (productId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: productId,
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