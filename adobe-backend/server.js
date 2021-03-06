
const expressConfig = require('./config/expressConfig')
const express = require('express');
const PORT = 8001;

require('dotenv').config()


// initialize the  express app
const app = express();

 // configuring express
 expressConfig(app);

// mounting the routes to the app
const routes = require("./routes/index.js")(app);

 // start server
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`)
});