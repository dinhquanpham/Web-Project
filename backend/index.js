const express = require('express');
const sequelize = require('./database/connect');
const model = require('./database/index');
const router = require('./routers/MainRouters');
const cookieParser = require('cookie-parser')
const app = express();
const port = 3030;

const init = async () => {
  //database
  model.loadModels();
  await sequelize.sync();

  //middleware
  app.use(express.json());
  app.use(express.urlencoded());

  //Cookie
  app.use(cookieParser());

  //router
  router(app);

  //message
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  });
}

init();


