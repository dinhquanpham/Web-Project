const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');

let format = function(a) {
    let b = 'FAHASA' + a;
    return b;
}

let localDate = function(date) {
    return date + 10000;
}

let getOrderById = async (orderId) => {
    try {
        let result = await Order.findOne({
            where: {
                id : orderId
            }
        });
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
            
        };
    }
}

let getAllOrder = async () => {
    try {
        let result = await sequelize.query(
            'select o.*, u.id, u.username from orders o join users u on u.id = o.userId;',
            {
                raw : true,
                type : QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        return errorCause = {
            error:e.name,
            
        };
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
        return errorCause = {
            error:e.name,
            
        };
    }
}

let addOrder = async (data) => {
    try {
        date = localDate(Date.now());
        let result = await Order.create({
            id: data.id,
            orderDate: date,
            shippedDate: data.shippedDate,
            paidAmount: data.paidAmount,
            paidStatus: data.paidStatus,
            paidAt: data.paidAt,
            userId: data.userId,
            paymentId: data.paymentId
        })
        const orderCode = format(result.id);
        result.set({
            orderCode: orderCode
        });
        result.save();
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
                return errorCause = {
            error:e.name,
            
        }
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
        return errorCause = {
            error:e.name,
            
        };
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