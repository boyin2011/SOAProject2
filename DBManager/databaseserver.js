//===============Database Manager =================
// nodemon --debug=6998 ./bin/www

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var rentals = require('./routes/rentals.js');
var payments = require('./routes/payments.js');
var staff = require('./routes/staff.js');
var stores = require('./routes/stores.js');

var mysql = require('./mysql.js');
var pagination = require('./pagination.js');

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

app.use('/rentals', rentals);
app.use('/payments', payments);
app.use('/staff', staff);
app.use('/stores', stores);

//===============EXPRESS=================



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
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('DB Manager Running!!!');
module.exports = app;
