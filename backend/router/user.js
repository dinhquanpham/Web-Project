const express = require('express');
const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let router = express.Router();

let initWebRoutes = (app) => {
    return new Promise (async (resolve, reject) => {
        try {
            let result = await  sequelize.query("SELECT * FROM users", {
                type: QueryTypes.SELECT
            })
            console.log(result);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = initWebRoutes;
