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
        var list = [];
        for (i = 1; i < data.length; i++) {
            console.log(data[i].total);
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

let getOrderDetailByOrderId = async (orderId) => {
    try {
        let orderDetail = await sequelize.query(
            'select od.id, p.id, p.productName, od.orderNumber, od.price'
            + ' from orderdetails od' 
            + ' join orders o on o.id = od.orderId'
            + ' join products p on p.id = od.productId'
            + ' where o.id = ?'
            + 'order by od.id desc ;', {
                raw: true,
                replacements: [orderId],
                type: QueryTypes.SELECT
            });
            return orderDetail;
    } catch (e) {
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
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        return data = {
            message: "Error",
        }
    }
}

module.exports = {
    getOrderDetailById: getOrderDetailById,
    getAllOrderDetail: getAllOrderDetail,
    addOrderDetail: addOrderDetail,
    getOrderDetailByOrderId: getOrderDetailByOrderId,
    deleteOrderDetail : deleteOrderDetail,
}