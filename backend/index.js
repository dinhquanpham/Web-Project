const express = require('express');
const sequelize = require('./database/connect');
const model = require('./database/index');
const router = require('./routers/MainRouters');
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

  //router
  router(app);

  app.use(express.static('../frontend/build'));

  //message
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  });
}

init();


