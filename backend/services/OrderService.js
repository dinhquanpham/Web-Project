const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');

let getOrderById = async (productId) => {
    return new Promise (async (resolve, reject) => {
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
    });
}

let getAllOrder = async () => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await Order.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addOrder = async (data) => {
    return new Promise(async (resolve, reject) => {
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
            resolve(order);
        }
        catch (e){ 
            reject (e);
        }
    });
}

let updateOrder = async (data) => {
    return new Promise(async (resolve, reject) => {
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
            resolve(product);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteOrder = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = await Order.findOne({
                where: {
                    id: productId,
                }
            });
            await order.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getOrderById: getOrderById,
    getAllOrder: getAllOrder,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder : deleteOrder,
}