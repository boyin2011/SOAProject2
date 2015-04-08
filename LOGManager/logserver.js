var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* SQS config */
var aws_config = require('./aws.credentials.json');
var SQS = require('./winston-sqs').SQS;

var before_opts = {
  name: 'before_sqs',
  aws_queueurl: 'https://sqs.us-west-2.amazonaws.com/667856117371/logging_before',
};

var after_opts = {
  name: 'after_sqs',
  aws_queueurl: 'https://sqs.us-west-2.amazonaws.com/667856117371/logging_after',
};

/* SNS config */
var sns_opts = {
  aws_key: aws_config.accessKeyId,
  aws_secret: aws_config.secretAccessKey,
  subscriber: 'arn:aws:sns:us-west-2:667856117371:fatlady:3875f72f-2b83-49b9-ba5a-bfe7aa6b908c',
  topic_arn: 'arn:aws:sns:us-west-2:667856117371:fatlady',
  region: 'us-west-2',
  level: 'error',
  subject: 'fatlady'
}

/* winston config */
var winston = require('winston'),
    SNS = require('winston-sns');

winston.loggers.add('before_log', {
  transports: [
    new (winston.transports.Console)(),
    new SQS(before_opts)
  ]
});

winston.loggers.add('after_log', {
  transports: [
    new (winston.transports.Console)(),
    new SQS(after_opts),
    new SNS(sns_opts)
  ]
});

var b_logger = winston.loggers.get('before_log');
var a_logger = winston.loggers.get('after_log');

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
  req.on('data', function(chunk) {
    console.log('before');
    b_logger.info(chunk.toString());
  });
};

function afterLogging(req, res) {
  req.on('data', function(chunk) {
    console.log('after');
    a_logger.info(chunk.toString());

    /* check if res is OK or 404, otherwise log to SNS */
    var post_data = JSON.parse(chunk.toString());
    var status = post_data.statusCode;
    if (status != 200 && status != 404)
      a_logger.error(chunk.toString());
  });
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
