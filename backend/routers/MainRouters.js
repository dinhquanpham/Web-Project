const modelsRouter = require('./ModelsRouter');
const searchRouter = require('./SearchRouter');
const loginRouter = require('../screens/login/LoginRouter');
const registerRouter = require('../screens/register/RegisterRouter');

function route(app) {
    app.use('/models', modelsRouter);
    app.use('/search', searchRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
}

module.exports = route;