const modelsRouter = require('./ModelsRouter');
const searchRouter = require('./SearchRouter');

function route(app) {
    app.use('/models', modelsRouter);
    app.use('/search', searchRouter);
}

module.exports = route;