const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Role = require('../models/Roles');

let getRoleById = async (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Role.findOne({
                where: {
                    id: roleId,
                }
            });
            resolve(result);
        } catch (e) {
            console.log("Can't find role");
            reject(e);
        }
    });
}

let getAllRole = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Role.findAll();
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

let addRole = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await Role.create({
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

let updateRole = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let role = await Role.findOne({
                where:
                    { id: data.id }
            });

            role.set({
                id: data.id,
                name: data.name,
                description: data.description,
            })
            await role.save();
            resolve(role);
        }
        catch (e) {
            reject(e);
        }
    });
}

let deleteRole = async (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let role = await Role.findOne({
                where: {
                    id: roleId,
                }
            });
            await role.destroy();
            let message = "Deleted";
            resolve(message);
        }
        catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getRoleById: getRoleById,
    getAllRole: getAllRole,
    addRole: addRole,
    updateRole: updateRole,
    deleteRole: deleteRole,
}