const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// var compression = require('compression');
var http = require('http');
var https = require('https');
var db = require('./config/database');

//Routes
var userRoutes = require('./api/Users/users.routes');
var websiteMainRoute = require('./website/routes/main');
var financeApi = require('./api/Finance/Calculations')

var app = express();

// call the database connectivity function
//db();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});


var httpServer = http.createServer(app);
var router = require('express').Router();


app.set('poerHTTP', process.env.PORT || 1122);
//app.set('portHTTPS', process.env.PORT || 1133);

app.set('views', path.join(__dirname, 'website/views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'website/public')));

app.set('env', 'production');
//app.set('env', 'development');

app.use('/',websiteMainRoute)
app.use('/api',router);
app.use('/api/finance',financeApi);

userRoutes(router);

app.use("/", express.static(path.join(__dirname, "/draw/dist")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/draw/dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/draw/dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});


/**********************************************************
* 404 Error Configuration
**********************************************************/

app.use(function (req, res, next) {
    if (app.get('env') === 'development') {
        //var err = new Error('Not Found');
        //err.status = 404;
        next();
    } else if (app.get('env') === 'production') {
        res.status(400);
        //res.render('error', { layout: 'Layouts/Casino/en', Title: 'Vegas2Web | Not found', MetaDesc: 'Vegas2Web Online Casino offers the best online casino games and the best online slots. Join now and recieve great welcome offers.', MetaKW: '', WebSiteGroup: 'Casino' });
    }
});

/**********************************************************
* 500 Error Configuration
**********************************************************/

app.use(function (error, req, res, next) {
    if (app.get('env') === 'development') {
        console.log(error);
        next(error);
    } else if (app.get('env') === 'production') {
        res.status(500);
        //res.render('error', { layout: 'Layouts/Casino/en', Title: 'Vegas2Web | Not found', MetaDesc: 'Vegas2Web Online Casino offers the best online casino games and the best online slots. Join now and recieve great welcome offers.', MetaKW: '', WebSiteGroup: 'Casino' });
    }
});

/**********************************************************
* Server Initiation
**********************************************************/

// httpsServer.listen(app.get('portHTTPS'), function () {
//     console.log('Vegas2web HTTPS. https://localhost:' + app.get('portHTTPS'));
// });

httpServer.listen(app.get('poerHTTP'), function () {
    console.log('MeBudgetAPI HTTP. http://localhost:' + app.get('poerHTTP'));
});
