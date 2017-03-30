var express = require('express');
var path = require('path');  
var session = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');
var compression = require('compression');
var app = express();

app.use(compression());

app.use(session({
  secret: "jafjasfjkazsf",
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Require Routes
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Before all routes
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/detail', detailRouter);

app.listen(3000);