const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let getSearchResult = async(data) => {
    try {
        let searchData = "%" + data + "%";
        let searchResult = await sequelize.query(
            "select p.id, p.productName, p.price, p.productSize, p.pageNumber, p.soldStatus, ps.name setName, ps.id setId, a.name " 
            + "from products p " 
            + "join authors a on p.authorId = a.id "
            + "join product_set ps on p.productsetId = ps.id "
            + "where p.productName like :searchData or a.name like :searchData or ps.name like :searchData "
            + "order by p.createdAt DESC", {
                raw: true,
                replacements: {searchData},
                type: QueryTypes.SELECT
            });
        return searchResult;
    } catch (e) {
        return "Error";
    }
}

module.exports = {
    getSearchResult: getSearchResult
}