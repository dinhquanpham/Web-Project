const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let getSearchResult = async(data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let searchData = "%" + data + "%";
            let searchResult = await sequelize.query(
                "select p.productName, p.price, a.name" 
                + " from products p join authors a on p.authorId = a.id"
                + " where p.productName like :searchData" 
                + " or a.name like :searchData;", {
                    raw: true,
                    replacements: {searchData},
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