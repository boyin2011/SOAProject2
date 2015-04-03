var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* SQS config */
var aws_config = require('./aws.credentials.json');
var SQS = require('./winston-sqs').SQS;

var beforeSQS = new (SQS)({
  name: 'before_sqs',
  aws_queueurl: 'https://sqs.us-west-2.amazonaws.com/667856117371/logging_before',
  aws_key: aws_config.accessKeyId,
  aws_secret: aws_config.secretAccessKey
});

/* SNS config */
var sns_options = {
  aws_key: aws_config.accessKeyId,
  aws_secret: aws_config.secretAccessKey,
  subscriber: 'arn:aws:sns:us-west-2:667856117371:fatlady:3875f72f-2b83-49b9-ba5a-bfe7aa6b908c',
  topic_arn: 'arn:aws:sns:us-west-2:667856117371:fatlady',
  region: 'us-west-2',
  subject: 'fatlady'
}

/* winston config */
var winston = require('winston'),
    winstonSNS = require('winston-sns');

// winston.add(winstonSNS, sns_options);
// winston.add(winston.transports.SNS, sns_options);
winston.add(beforeSQS);
/*******************/

/* Auto generated code */
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*******************/

app.post('/logging/before', beforeLogging);
app.post('/logging/after', afterLogging);

function beforeLogging(req, res) {
  winston.log('info', req.request_obj);
};

function afterLogging(req, res) {
  winston.info('Hello from afterLogging');
}

/* Auto generated code */
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

module.exports = app;
