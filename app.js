// reads in our .env file and makes those values available as environment variables
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/main.js');
const secureRoutes = require('./routes/secure.js');
const users = require('./routes/users.js');
const mongoose = require('mongoose');
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, );
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
// create an instance of an express app
const app = express();
// update express settings
var conn = mongoose.connection;

var user = {
    timestamp: Date.now(), 
};


app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
// main routes
app.use('/', routes);
app.use('/', secureRoutes);
app.use('/', users);


// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});