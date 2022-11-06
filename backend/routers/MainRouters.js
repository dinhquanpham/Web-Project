const userRouter = require('./UserRouters');

function route(app) {
    app.use('/user', userRouter);
}

module.exports = route;