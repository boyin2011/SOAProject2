var winston = require("winston");
var AWS = require('aws-sdk'),
  awsCredentialsPath = './aws.credentials.json',
  sqsQueueUrl = 'https://sqs.us-west-2.amazonaws.com/667856117371/soa_queue',
  sqsQueueArn = 'arn:aws:sqs:us-west-2:667856117371:soa_queue',
  sqs;
AWS.config.loadFromPath(awsCredentialsPath);
// var aws         = require("aws-sdk"),
    // assert      = require("assert"),

var util        = require("util");

var SQS = winston.transports.SQS = exports.SQS =  function (options) {

    options         = options || {};

    this.name       = 'sqs';
    this.level      = options.level  || 'info';
    this.timestamp  = options.timestamp !== false;

    this.queueurl   = 'https://sqs.us-west-2.amazonaws.com/667856117371/soa_queue';
    this.client     = new AWS.SQS();

};

util.inherits(SQS, winston.Transport);

SQS.prototype.log = function( level, msg, meta, callback) {

    if (typeof meta === 'function' && arguments.length == 3) {
        callback = meta;
        meta = {};
    }

    var output = new Date().toISOString();
    output += ' : ';
    output += level;
    output += ' : ';
    output += msg;
    output += ' : ';
    if (meta !== null && meta !== undefined) {
        if (typeof meta !== 'object') {
            output += meta;
        }
        else if (Object.keys(meta).length > 0) {
            try {
             output += JSON.stringify(meta);
            }
            catch(err) {
                output += "metadata could not be output due to circular reference"
            }
        }
    }

    this.client.sendMessage({ QueueUrl : this.queueurl, MessageBody : output}, function(err, response) {
        return callback(err, !!response);
    });
}
