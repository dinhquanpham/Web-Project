const express = require('express');
const sequelize = require('./database/connect');
const model = require('./database/index');
const router = require('./routers/MainRouters');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
const port = 3030;

const init = async () => {
  //database
  model.loadModels();
  await sequelize.sync();

  //cors
  app.use(cors());

  //middleware
  app.use(express.json());
  app.use(express.urlencoded());

  //Cookie
  app.use(cookieParser());

  //router
  router(app);

  app.use(express.static('../frontend/build'));


  //message
  app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`)
  });
}

init();


