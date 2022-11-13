const searchService = require('../services/SearchService');

const getResult = async (req, res) => {
    let data = req.query.name;
    let result = await searchService.getSearchResult(data);
    res.send(result);
}

module.exports = {
    getResult: getResult,
}