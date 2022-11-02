const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let loadData = () => {
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

module.exports = {
    loadData: loadData
}