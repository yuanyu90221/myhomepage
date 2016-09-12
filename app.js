// main server controller

// step1 new a express module
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var router;
//app.use(express.static(path.join(__dirname,'/public')));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//套用個模組的結尾是html
app.set('views', path.join(__dirname, '/public/view'));
app.set('view engine','html');
app.engine('html', hbs.__express);
router = require('./routes/router')(app);
http.createServer(app).listen(1337);

