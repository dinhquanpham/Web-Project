const modelsRouters = require('./ModelsRouter');

function route(app) {
    app.use('/models', modelsRouters);
}

module.exports = route;