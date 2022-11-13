const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let getSearchResult = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let searchData = "%" + data + "%";
            let searchResult = await sequelize.query(
                'SELECT * FROM products p WHERE p.productName LIKE ?', {
                    raw: true,
                    replacements: [searchData],
                    type: QueryTypes.SELECT
                });
            resolve(searchResult);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getSearchResult: getSearchResult
}