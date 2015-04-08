var winston = require("winston"),
    aws = require('aws-sdk'),
    util        = require("util"),
    awsCredentialsPath = './aws.credentials.json';

aws.config.loadFromPath(awsCredentialsPath);

var SQS = winston.transports.SQS = exports.SQS =  function (options) {

    options         = options || {};

    this.name       = options.name;
    this.level      = options.level  || 'info';
    this.timestamp  = options.timestamp !== false;

    this.queueurl   = options.aws_queueurl;
    this.client     = new aws.SQS();
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
