//===============API Manager =================
// nodemon --debug=7000 ./bin/www

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('./configpassport');

//===============EXPRESS=================

// Configure Express
var app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//===============PROCESSING=================

app.post('/SECManager/signin', function(req, res, next) {
    passport.authenticate('signin', function(err, user, info) {
      res.send(info);
    })(req, res, next);
});

app.post('/SECManager/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      res.send(info);
    })(req, res, next);
});

app.post('/SECManager/APIKEYsignin', function(req, res, next) {
    passport.authenticate('APIKEYsignin', function(err, user, info) {
      res.send(info);
    })(req, res, next);
});

app.post('/SECManager/createSecApikey', function(req, res, next) {
    passport.authenticate('createSecApikey', function(err, user, info) {
      res.send(info);
    })(req, res, next);
});

app.post('/SECManager/createPIApikey', function(req, res, next) {
    passport.authenticate('createPIApikey', function(err, user, info) {
      res.send(info);
    })(req, res, next);
});

//===============ERROR handlers=================
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('error', {
        message: err.message,
        error: {}
    });
});

console.log('Sec Manager Running!!!');
module.exports = app;
