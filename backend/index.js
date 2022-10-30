const express = require('express');

const sequelize = require('./database/connect');

const User = require('./entity/user');
const Role = require('./entity/Role');
const ShipAddress = require('./entity/ShipAddress');
const Product = require('./entity/Product');
const Order = require('./entity/Order');
const OrderDetails = require('./entity/OderDetails');
const Payment = require('./entity/Payment');
const Provider = require('./entity/Provider');
const Category = require('./entity/Category');
const ProductSet = require('./entity/ProductSet');
const Author = require('./entity/Author');

const app = express();

const port = 3030;

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json);

app.listen(port, () => {
    console.log("fuck off");
})

