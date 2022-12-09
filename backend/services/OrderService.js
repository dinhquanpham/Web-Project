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
        return result;
    } catch (e) {
        throw e;
    }
}

let getAllOrder = async () => {
    try {
        let result = await sequelize.query(
            'select o.*, u.username from orders o join users u on u.id = o.userId;',
            {
                raw : true,
                type : QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        throw e;
    }
}

let getOrderByUser = async(userId) => {
    try {
        let result = await sequelize.query(
            'select * from orders where userId = ?', {
                raw: true,
                replacements: [userId],
                type: QueryTypes.SELECT
            }
        )
        return result;
    } catch(e) {
        throw e;
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
            userId: data.userId,
            paymentId: data.paymentId
        })
        return result;
    }
    catch (e) {
        throw e;
    }
}

let updateOrder = async (data) => {
    try {
        // we don't need update
        return null;
    } catch(e) {
        throw e
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
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        throw e;
    }
}

module.exports = {
    getOrderById: getOrderById,
    getAllOrder: getAllOrder,
    getOrderByUser: getOrderByUser,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder : deleteOrder,
}