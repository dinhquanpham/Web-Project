const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Payment = require('../models/Payments');

let getPaymentById = async (paymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Payment.findOne({
                where: {
                    id: paymentId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find payment");
            reject(e);
        }
    });
}

let getAllPayment = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Payment.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addPayment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Payment.create({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
}

let updatePayment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = await Payment.findOne({
                where:
                    { id: data.id }
            });

            payment.set({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            await payment.save();
            resolve(payment);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deletePayment = async (paymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let payment = await Payment.findOne({
                where: {
                    id: paymentId,
                }
            });
            await payment.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getPaymentById: getPaymentById,
    getAllPayment: getAllPayment,
    addPayment: addPayment,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
}