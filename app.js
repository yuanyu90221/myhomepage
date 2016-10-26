// main server controller
var ClientId = '325329452020-f1lhf0g3p0lf17vl338tc7ua2upubkf3.apps.googleusercontent.com';
var ClientSecret = 'M3qupbLX3FwyBp7ADgUnhpFi';
var herokuHost = 'https://vast-cove-31986.herokuapp.com';
var isHeroku = true;
// step1 new a express module
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var os = require('os');
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
const RedirectionUrl = (isHeroku==false)?"http://"+getIpv4()+":"+port+"/oauthCallback":herokuHost+"/oauthCallback";
function getIpv4(){
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }

    console.log(addresses);
    if(addresses[0].includes('192.168'));
    addresses[0] = 'localhost';
    return addresses[0];
}

function getOAuthClient () {
    return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
      'https://www.googleapis.com/auth/plus.me'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes // If you only need one scope you can pass it as string
    });

    return url;
}

app.get("/oauthCallback", function (req, res) {
    console.log('oauthCallback');
    var oauth2Client = getOAuthClient();
    var session = req.session;
    var code = req.query.code; // the query param code
    console.log(code);
    oauth2Client.getToken(code, function(err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      //console.log(code);
      //console.log(err);
      if(!err) {
        oauth2Client.setCredentials(tokens);
        //saving the token to current session
        session["tokens"]=tokens;
        res.redirect('/details');
        //res.send('<h3>Login successful!!</h3>'+'<a href="/details">Go to details page</a>');
      }
      else{
        res.redirect("/");
      }
    });
});
app.get("/details", function (req, res) {
    console.log("details")
    console.log(req.session["tokens"]);
    var oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(req.session["tokens"]);


        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {

            console.log(response);

            if(response.displayName){
                // res.send('<img src="'+response.image.url.replace('sz=50','sz=200')+'" style="border-radius:50%;"/>'+'<h3>Hello "'+response.displayName+'"</h3>');
                req.session.username = response.name.familyName;
                req.session.url = response.image.url.replace('sz=50','sz=20');
                res.render('main',{'username':req.session.username,'url':req.session.url});
            }
            else{
                 res.redirect('/');
            }

        });
});

//this is the base route
app.get("/googleauth", function (req, res) {
    console.log("googleauth");
    var url = getAuthUrl();
    console.log(url);
    //
    res.redirect(url);
});