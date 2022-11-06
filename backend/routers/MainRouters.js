const userRouter = require('./UserRouters');
const roleRouter = require('./RoleRouter');
const providerRouter = require('./ProviderRouter');
const productSetRouter = require('./ProductSetRouter');
const productRouter = require('./ProductRouter');
const paymentRouter = require('./PaymentRouter');
const orderRouter = require('./OrderRouter');
const orderDetailRouter = require('./OrderDetailRouter');
const categoryRouter = require('./CategoryRouter');
const authorRouter = require('./AuthorRouter');
const addressRouter = require('./AddressRouters');

function route(app) {
    app.use('/user', userRouter),
    app.use('/role', roleRouter),
    app.use('/provider', providerRouter),
    app.use('/product-set',productSetRouter),
    app.use('/product', productRouter),
    app.use('/payment', paymentRouter),
    app.use('/order', orderRouter),
    app.use('/order-detail', orderDetailRouter),
    app.use('/category', categoryRouter),
    app.use('/author', authorRouter),
    app.use('/address', addressRouter);
}

module.exports = route;