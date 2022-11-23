const searchService = require('../services/SearchService');

const getResult = async (req, res) => {
    let name = req.query.name;
    let result = await searchService.getSearchResult(name);
    res.send(result);
}

module.exports = {
    getResult: getResult,
}