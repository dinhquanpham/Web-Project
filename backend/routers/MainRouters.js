const modelsRouter = require('./ModelsRouter');
const searchRouter = require('./SearchRouter');
const loginRouter = require('../screens/login/LoginRouter');
function route(app) {
    app.use('/models', modelsRouter);
    app.use('/search', searchRouter);
    app.use('/login', loginRouter);
}

module.exports = route;