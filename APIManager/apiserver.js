//===============API Manager =================
// nodemon --debug=6999 ./bin/www

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var securitymw = require('./securitymw.js');
var logmw = require('./logmw.js');

//===============EXPRESS=================

// Configure Express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

//===============ROUTES=================

app.use(securitymw);
app.use(logmw.before);

app.get('/', function(req, res, next) {
    res.send("Hello world");
    req.status = 333;
    // console.log(req.status);
    next();
});

app.use(logmw.after);

//===============ERROR Handlers=================
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.sendStatus(err.status || 500);
});


module.exports = app;
