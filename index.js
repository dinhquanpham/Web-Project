const express = require('express');

const connect = require('./database/connect.js');

const app = express();

const port = 3030;

// app.use("/123", () => {
//     console.log("Fuck");
// });

app.get("/123", (request, response) => {
    response.send("alo");
});

app.listen(port, () => {
    console.log("fuck off");
})

