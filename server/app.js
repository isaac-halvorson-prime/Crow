//----------------------------------------------------------------------------//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var databaseUri = 'mongodb://localhost:27017/crow';
var twitter = require('./modules/twitter.module');
var db = require('./modules/db');
require('dotenv').config({path: __dirname + '/.env'});
//----------------------------------------------------------------------------//

//---------------------------------- SETUP -----------------------------------//

app.use(bodyParser.json());
app.use(express.static('./server/public'));
app.listen(3000);

//----------------------- MONGOOSE CONNECTION HANDLING -----------------------//

mongoose.connect(databaseUri);

mongoose.connection.on('connected', function() {
  console.log('mongoose connected to ', databaseUri);
});

mongoose.connection.on('error', function(error) {
  console.log('mongoose connection error: ', error);
});

//----------------------------- ROUTES & MODULES -----------------------------//

app.use('/twitter', twitter);
app.use('/db', db);
