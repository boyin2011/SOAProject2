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

//user wants to register
app.get('/', function(req, res) {
  res.send("Hello!");
});
app.post('/signin', passport.authenticate('signin'));

app.post('/SECManager/signup', passport.authenticate('signup', {
    successRedirect: '/'
  })
);



// //user wants to sign in to get APIkeys
// app.post('/SECManager/signin', passport.authenticate('signin', {
//   successFlash: 'sign in success.',
//   failureFlash: 'sign in failed.'
//   })
// );

//user invokes a UI with APIkeys
app.post('/', passport.authenticate('apiKeys', {
  successFlash: 'apiKey auth success.',
  failureFlash: 'apiKey auth failed.'
  })
);

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
