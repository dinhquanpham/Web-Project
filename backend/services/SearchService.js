const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');

let getSearchResult = async(data, page, size) => {
    try {
        let searchData = "%" + data + "%";
        let result = await sequelize.query(
            "select p.*, ps.name setName, ps.id setId, a.name " 
            + "from products p " 
            + "join authors a on p.authorId = a.id "
            + "join product_set ps on p.productsetId = ps.id "
            + "where p.productName like :searchData or a.name like :searchData or ps.name like :searchData "
            + "order by p.createdAt DESC", {
                raw: true,
                replacements: {searchData},
                type: QueryTypes.SELECT
            });
        if (page != null) {
            let pageNumber = parseInt(page);
            let pageSize = parseInt(size);
            let start = (pageNumber - 1) * pageSize ;
            return result.slice(start, start + pageSize);
        }
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getSearchResult: getSearchResult
}