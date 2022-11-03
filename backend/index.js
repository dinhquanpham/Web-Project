const express = require('express');
const sequelize = require('./database/connect');
const router = require('./routers/index');
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

//router
router(app);

//message
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})



