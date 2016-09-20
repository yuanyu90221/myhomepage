// main server controller

// step1 new a express module
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var router;
//app.use(express.static(path.join(__dirname,'/public')));
// uncomment after placing your favicon in /public
// 必須比expressSession早
app.use(cookieParser());
app.use(expressSession({secret:'myhomepage',  name : 'sessionId',resave: true, saveUninitialized: true }));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//套用個模組的結尾是html
app.set('views', path.join(__dirname, '/public/view'));
app.set('view engine','html');
app.engine('html', hbs.__express);
router = require('./routes/router')(app);
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//app.set('port', (process.env.PORT || 5000));
http.createServer(app).listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
